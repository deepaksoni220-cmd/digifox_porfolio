import crypto from 'crypto';
import { db } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'digifox_master_jwt_secret_key_2026_secure';

// Helper: Hash password with salt
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

// Helper: Verify password
export function verifyPassword(password, combinedHash) {
  if (!password || !combinedHash || !combinedHash.includes(':')) return false;
  const [salt, key] = combinedHash.split(':');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

// Helper: Generate signed session token
export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name || user.email.split('@')[0],
    role: user.role || 'user',
    plan: user.plan || 'free',
    issuedAt: Date.now()
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payloadStr).digest('base64url');
  return `${payloadStr}.${signature}`;
}

// Helper: Verify session token
export function verifyToken(token) {
  if (!token || !token.includes('.')) return null;
  const [payloadStr, signature] = token.split('.');
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payloadStr).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
    // Token valid for 30 days
    if (Date.now() - payload.issuedAt > 30 * 24 * 60 * 60 * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export class AuthService {
  constructor() {
    this.ensureAdminSeed();
  }

  // Ensure master admin account exists
  ensureAdminSeed() {
    const adminEmail = 'admin@digifox.world';
    const existing = db.getUserByEmail(adminEmail);
    if (!existing) {
      db.saveUser({
        name: 'Digifox Master Admin',
        email: adminEmail,
        passwordHash: hashPassword('digifox2026'),
        role: 'admin',
        plan: 'agency'
      });
      console.log('👑 [AuthService] Initialized Master Admin: admin@digifox.world');
    }
  }

  // Register new user
  async register(name, email, password) {
    if (!email || !password) throw new Error('Email and password are required.');
    const cleanEmail = email.toLowerCase().trim();
    if (db.getUserByEmail(cleanEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const isAdmin = cleanEmail === 'admin@digifox.world';
    const user = db.saveUser({
      name: name || cleanEmail.split('@')[0],
      email: cleanEmail,
      passwordHash: hashPassword(password),
      role: isAdmin ? 'admin' : 'user',
      plan: isAdmin ? 'agency' : 'free'
    });

    const token = generateToken(user);
    const { passwordHash, ...safeUser } = user;
    return { user: safeUser, token };
  }

  // Login user
  async login(email, password) {
    if (!email || !password) throw new Error('Email and password are required.');
    const cleanEmail = email.toLowerCase().trim();
    const user = db.getUserByEmail(cleanEmail);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid email or password.');
    }

    const token = generateToken(user);
    const { passwordHash, ...safeUser } = user;
    return { user: safeUser, token };
  }

  // Get current user profile
  getUserProfile(userId) {
    const user = db.getUserById(userId);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    const subscription = db.getUserSubscription(userId);
    return {
      ...safeUser,
      subscription: subscription || null,
      hasActivePlan: safeUser.role === 'admin' || (subscription && subscription.status === 'ACTIVE') || safeUser.plan !== 'free'
    };
  }

  // Activate / Upgrade Plan
  subscribeUser(userId, plan = 'pro') {
    const user = db.getUserById(userId);
    if (!user) throw new Error('User not found.');
    const sub = db.saveSubscription({
      user_id: userId,
      plan: plan.toLowerCase(),
      status: 'ACTIVE',
      monthly_limit: plan === 'agency' ? 50 : (plan === 'pro' ? 20 : 5)
    });
    return this.getUserProfile(userId);
  }
}

export const authService = new AuthService();

// Express Auth Middleware
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.query.token;

  if (!token) {
    req.user = null;
    return next();
  }

  const decoded = verifyToken(token);
  if (decoded) {
    req.user = decoded;
  } else {
    req.user = null;
  }
  next();
}

// Require Active Plan or Admin
export function requirePlanOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required. Please sign in.' });
  }
  if (req.user.role === 'admin') {
    return next();
  }
  const user = db.getUserById(req.user.id);
  const sub = db.getUserSubscription(req.user.id);
  const hasPlan = (sub && sub.status === 'ACTIVE') || (user && user.plan !== 'free');
  if (!hasPlan) {
    return res.status(403).json({
      success: false,
      code: 'PLAN_REQUIRED',
      error: 'An active subscription plan is required to perform this action. Please upgrade your plan.'
    });
  }
  next();
}
