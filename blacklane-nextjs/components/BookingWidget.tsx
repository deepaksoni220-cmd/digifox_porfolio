'use client';

import { useState } from 'react';

export function BookingWidget() {
  const [tripType, setTripType] = useState<'transfer' | 'hourly'>('transfer');

  return (
    <div data-cy="booking-widget" className="BookingWidget_bookingWidgetWrapper__uVukG">
      <div role="presentation">
        <div role="radiogroup" aria-label="Category selection" className="SegmentedControl_group__eYWdG SegmentedControl_mode-dark__0wkdf BookingWidget_categoryToggleButton__Kl37V">
          <label
            className={`SegmentedControlItem_option__qIJgI SegmentedControlItem_mode-dark__UChb6 ${tripType === 'transfer' ? 'SegmentedControlItem_selected__b4f1' : ''}`}
            onClick={() => setTripType('transfer')}
            style={{ cursor: 'pointer' }}
          >
            <input type="radio" name="trip-type" checked={tripType === 'transfer'} onChange={() => setTripType('transfer')} value="transfer" style={{ display: 'none' }} />
            One way
          </label>
          <label
            className={`SegmentedControlItem_option__qIJgI SegmentedControlItem_mode-dark__UChb6 ${tripType === 'hourly' ? 'SegmentedControlItem_selected__b4f1' : ''}`}
            onClick={() => setTripType('hourly')}
            style={{ cursor: 'pointer' }}
          >
            <input type="radio" name="trip-type" checked={tripType === 'hourly'} onChange={() => setTripType('hourly')} value="hourly" style={{ display: 'none' }} />
            By the hour
          </label>
        </div>
      </div>

      <div data-expanded="false" className="BookingWidget_bookingWindow__yxntP">
        <div className="BookingWidget_searchBar__yrr_r">
          <div className="BookingWidget_locationSection__ows_i BookingWidget_sectionGroup__3Oh2H" data-attr="locationSection">
            <div className="BookingWidget_fieldWrapper__vaH_6">
              <div className="Dropdown_triggerContainer__QkmxC">
                <div className="Dropdown_triggerInner__LLi0L">
                  <div className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_staticLabel__FWv96">
                    <label htmlFor="pickup-location" className="FieldWrapper_label__HOD_S">Pickup location</label>
                    <div className="FieldWrapper_inputContainer__qXY8R">
                      <input id="pickup-location" className="Input_input__IHYPL Input_dark__U_gXZ" aria-invalid="false" autoComplete="off" placeholder="Address, airport, hotel, ..." name="pickup-location" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {tripType === 'transfer' && (
              <div className="BookingWidget_fieldWrapper__vaH_6">
                <div className="Dropdown_triggerContainer__QkmxC">
                  <div className="Dropdown_triggerInner__LLi0L">
                    <div className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_staticLabel__FWv96">
                      <label htmlFor="dropoff-location" className="FieldWrapper_label__HOD_S">Drop-off location</label>
                      <div className="FieldWrapper_inputContainer__qXY8R">
                        <input id="dropoff-location" className="Input_input__IHYPL Input_dark__U_gXZ" aria-invalid="false" autoComplete="off" placeholder="Address, airport, hotel, ..." name="dropoff-location" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <hr aria-orientation="vertical" aria-hidden="true" className="Divider_divider__NDhMz Divider_orientation-vertical__AaiZj Divider_type-inverse__RxhXg BookingWidget_divider__cecmo" />

          <div className="BookingWidget_scheduleSection__LA4W0 BookingWidget_sectionGroup__3Oh2H">
            <div className="BookingWidget_fieldWrapper__vaH_6">
              <div data-booking-field="date" style={{ width: '100%' }}>
                <div className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_staticLabel__FWv96 DatePickerInput_dateInput__uf_om">
                  <label htmlFor="booking-date" className="FieldWrapper_label__HOD_S">Date</label>
                  <div className="FieldWrapper_inputContainer__qXY8R">
                    <input id="booking-date" className="Input_input__IHYPL Input_dark__U_gXZ" placeholder="Select a date" defaultValue="Today" />
                    <span className="FieldWrapper_endAdornment__Dcnms">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down" aria-hidden="true">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="BookingWidget_fieldWrapper__vaH_6">
              <div className="Dropdown_triggerContainer__QkmxC">
                <div className="Dropdown_triggerInner__LLi0L">
                  <div className="FieldWrapper_wrapper__FqkMf FieldWrapper_mode-dark__dZDaL FieldWrapper_hasValue__XxSTH FieldWrapper_staticLabel__FWv96 Combobox_readOnly__sLWN5">
                    <label htmlFor="booking-time" className="FieldWrapper_label__HOD_S">Pickup time</label>
                    <div className="FieldWrapper_inputContainer__qXY8R">
                      <input id="booking-time" className="Input_input__IHYPL Input_dark__U_gXZ" defaultValue="1:15 PM" />
                      <span className="FieldWrapper_endAdornment__Dcnms">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down" aria-hidden="true">
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr aria-orientation="vertical" aria-hidden="true" className="Divider_divider__NDhMz Divider_orientation-vertical__AaiZj Divider_type-inverse__RxhXg BookingWidget_divider__cecmo" />

          <div className="BookingWidget_actionSection__r7HOH">
            <button type="button" className="BaseButton_baseButton__RgDvP BaseButton_size-large___KryX StandardButton_standard-button__uILct StandardButton_variant-filled__ZEiIH BookingWidget_searchButton__0z5yQ" data-cy="search-button">
              View options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
