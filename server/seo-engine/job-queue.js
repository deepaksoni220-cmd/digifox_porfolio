import { db } from './db.js';
import { geminiService } from './gemini-service.js';

export const JOB_STATUSES = {
  QUEUED: 'QUEUED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export const JOB_TYPES = {
  BUSINESS_UNDERSTANDING: 'BUSINESS_UNDERSTANDING',
  KEYWORD_DISCOVERY: 'KEYWORD_DISCOVERY',
  KEYWORD_SELECTION: 'KEYWORD_SELECTION',
  SERP_ANALYSIS: 'SERP_ANALYSIS',
  PAGE_OPTIMIZATION: 'PAGE_OPTIMIZATION',
  BLOG_GENERATION: 'BLOG_GENERATION',
  QUALITY_VALIDATION: 'QUALITY_VALIDATION'
};

export class JobQueue {
  constructor() {
    this.isProcessing = false;
    this.maxConcurrent = 2;
    this.activeJobs = 0;
  }

  enqueue(clientId, jobType, payload = {}, websiteId = null, pageId = null) {
    const job = db.createAiJob({
      client_id: clientId,
      website_id: websiteId || clientId,
      page_id: pageId,
      job_type: jobType,
      status: JOB_STATUSES.QUEUED,
      payload
    });

    // Asynchronously kick off processing loop
    setTimeout(() => this.processNext(), 50);
    return job;
  }

  async processNext() {
    if (this.isProcessing || this.activeJobs >= this.maxConcurrent) return;
    this.isProcessing = true;

    try {
      const allJobs = db.getAiJobs();
      const nextJob = allJobs.find(j => j.status === JOB_STATUSES.QUEUED);

      if (!nextJob) {
        this.isProcessing = false;
        return;
      }

      this.activeJobs++;
      db.updateAiJob(nextJob.id, {
        status: JOB_STATUSES.RUNNING,
        started_at: new Date().toISOString()
      });

      this.executeJob(nextJob)
        .then(result => {
          db.updateAiJob(nextJob.id, {
            status: JOB_STATUSES.COMPLETED,
            result,
            completed_at: new Date().toISOString(),
            error: null
          });
        })
        .catch(err => {
          console.error(`[JobQueue] Job ${nextJob.id} failed:`, err.message);
          const currentRetries = (nextJob.retry_count || 0) + 1;
          
          if (currentRetries < 2) {
            // Retry once
            db.updateAiJob(nextJob.id, {
              status: JOB_STATUSES.QUEUED,
              retry_count: currentRetries,
              error: `Attempt ${currentRetries} failed: ${err.message}`
            });
          } else {
            db.updateAiJob(nextJob.id, {
              status: JOB_STATUSES.FAILED,
              completed_at: new Date().toISOString(),
              error: err.message
            });
          }
        })
        .finally(() => {
          this.activeJobs--;
          this.isProcessing = false;
          // Process next queued job
          setTimeout(() => this.processNext(), 100);
        });

    } catch (e) {
      console.error('[JobQueue] Error in queue loop:', e);
      this.isProcessing = false;
    }
  }

  async executeJob(job) {
    const { client_id, job_type, payload } = job;
    const client = db.getClientById(client_id);
    if (!client) throw new Error(`Client ${client_id} not found.`);

    switch (job_type) {
      case JOB_TYPES.BUSINESS_UNDERSTANDING: {
        return await geminiService.understandBusiness(client_id, payload.websiteContent || '', client);
      }

      case JOB_TYPES.KEYWORD_DISCOVERY: {
        return await geminiService.discoverAndScoreKeywords(
          client_id,
          payload.businessProfile,
          payload.googleSuggestions || [],
          payload.serpResults || []
        );
      }

      case JOB_TYPES.KEYWORD_SELECTION: {
        return await geminiService.selectAndMapKeywords(
          client_id,
          payload.keywords || [],
          payload.pages || []
        );
      }

      case JOB_TYPES.SERP_ANALYSIS: {
        return await geminiService.analyzeSerpCompetitors(
          client_id,
          payload.keyword,
          payload.serpData
        );
      }

      case JOB_TYPES.PAGE_OPTIMIZATION: {
        return await geminiService.generatePageOptimization(
          client_id,
          payload.pageData,
          payload.targetKeyword,
          payload.serpAnalysis,
          payload.businessProfile
        );
      }

      case JOB_TYPES.BLOG_GENERATION: {
        const article = await geminiService.generateComprehensiveBlog(
          client_id,
          payload.keyword,
          payload.topic,
          payload.businessProfile,
          payload.serpGaps || []
        );

        // Run validation pass
        const factCheck = await geminiService.factCheckArticle(client_id, article, payload.businessProfile).catch(() => null);
        const qualityValidation = await geminiService.validateContentQuality(client_id, article, payload.keyword).catch(() => null);

        return {
          article,
          factCheck,
          qualityValidation
        };
      }

      default:
        throw new Error(`Unsupported job type: ${job_type}`);
    }
  }
}

export const jobQueue = new JobQueue();
