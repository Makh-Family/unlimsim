function generateBasketItemForm(data,counter) {
  return `
  <div class="js-basket-form__item w-100 row" data-item="${counter + 1}">
    <form class="shopping-card__form col-lg-7 col-md-12">
      <div class="left-item mb-5">
        <div class="inner-box">
          <h5>Location</h5>
          <div class="item-box plans-block my-3">
            <button type="button" class="btn btn-show-countries" data-target="#map">?</button>
            <div class="row">
              <div class="col-sm-2 d-flex justify-content-center align-items-center">
                <img src="img/icons/icon1-r.png" alt="icon1" width="85" height="50" />
              </div>

              <div class="row col-sm-10">
                <div class="col-sm-6 bs-select-wrapper" data-type="plan" id="plan-select">
                  <select class="form-control selectpicker" id="switch-location" name="location"
                    data-title="Select location" data-width="100%" data-dropup-auto="false">
                    <option value="worldwide">Worldwide</option>
                    <option value="region">Region</option>
                    <option value="country">Country</option>
                  </select>
                </div>
                <div class="col-sm-6 bs-select-wrapper" data-type="tariff" id="tariff-select">
                  <select class="form-control selectpicker" id="switch-tariff" name="tariff" data-title="Select type"
                    data-width="100%" data-dropup-auto="false">
                    <option value="start" selected>Unlim START</option>
                    <option value="pro">Unlim PRO</option>
                    <option value="max">Unlim MAX</option>
                    <option value="maxpro">Unlim MAX PRO</option>
                  </select>
                </div>
                <div class="col-sm-6 bs-select-wrapper after-plan" data-type="continent" id="region-select">
                  <select class="form-control selectpicker" name="region" data-title="Select region" data-width="100%"
                    data-dropup-auto="false">
                    <!-- <option selected>Select region</option> -->
                    <option value="Asia">Asia</option>
                    <option value="Australia">Australia</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="N. America">North America</option>
                    <option value="S. America">South America</option>
                  </select>
                </div>

                <div class="col-sm-6 bs-select-wrapper after-plan" data-type="country" id="country-select">
                  <!-- data-size="500" -->
                  <select class="form-control selectpicker" name="country" data-live-search="true"
                    data-live-search-style="startsWith" data-title="Select country" data-width="100%"
                    data-dropup-auto="false">
                    <!-- <option selected>Select country</option> -->
                    <optgroup label="A">
                      <option>ALBANIA</option>
                      <option>ALGERIA</option>
                      <option>ANGUILLA</option>
                      <option>ANTIGUA AND BARBUDA</option>
                      <option>ARMENIA</option>
                      <option>AUSTRALIA</option>
                      <option>AUSTRIA</option>
                      <option>AZERBAIJAN</option>
                    </optgroup>

                    <optgroup label="B">
                      <option>BAHRAIN</option>
                      <option>BANGLADESH</option>
                      <option>BARBADOS</option>
                      <option>BELARUS</option>
                      <option>BELGIUM</option>
                      <option>BELIZE</option>
                      <option>BOSNIA & HERZEGOVINA</option>
                      <option>BRAZIL</option>
                      <option>BRUNEI</option>
                      <option>BULGARIA</option>
                      <option>BURKINA FASO</option>
                    </optgroup>

                    <optgroup label="C">
                      <option>CAMBODIA</option>
                      <option>CAMEROON</option>
                      <option>CANADA</option>
                      <option>CAYMAN ISLANDS</option>
                      <option>CHAD</option>
                      <option>CHILE</option>
                      <option>CHINA</option>
                      <option>COLOMBIA</option>
                      <option>CONGO</option>
                      <option>CONGO DEM REP</option>
                      <option>COSTA RICA</option>
                      <option>COTE D'IVOIRE (IVORY COAST)</option>
                      <option>CROATIA</option>
                      <option>CURACAO</option>
                      <option>CYPRUS</option>
                      <option>CZECH REPUBLIC</option>
                    </optgroup>

                    <optgroup label="D">
                      <option>DENMARK</option>
                      <option>DOMINICA</option>
                    </optgroup>

                    <optgroup label="E">
                      <option>ECUADOR</option>
                      <option>EGYPT</option>
                      <option>EL SALVADOR</option>
                      <option>ESTONIA</option>
                      <option>ETHIOPIA</option>
                    </optgroup>

                    <optgroup label="F">
                      <option>FAROE ISLANDS</option>
                      <option>FIJI</option>
                      <option>FINLAND</option>
                      <option>FRANCE</option>
                      <option>FRENCH GUIANA</option>
                    </optgroup>

                    <optgroup label="G">
                      <option>GABON</option>
                      <option>GEORGIA</option>
                      <option>GERMANY</option>
                      <option>GHANA</option>
                      <option>GIBRALTAR</option>
                      <option>GREECE</option>
                      <option>GREENLAND</option>
                      <option>GRENADA</option>
                      <option>GUADELOUPE</option>
                      <option>GUINEA</option>
                      <option>GUYANA</option>
                    </optgroup>

                    <optgroup label="H">
                      <option>HAITI</option>
                      <option>HAWAII - USA</option>
                      <option>HONDURAS</option>
                      <option>HONG KONG</option>
                      <option>HUNGARY</option>
                    </optgroup>

                    <optgroup label="I">
                      <option>ICELAND</option>
                      <option>INDIA</option>
                      <option>INDONESIA</option>
                      <option>IRAN</option>
                      <option>IRELAND</option>
                      <option>ISRAEL</option>
                      <option>ITALY</option>
                    </optgroup>

                    <optgroup label="J">
                      <option>JAMAICA</option>
                      <option>JAPAN</option>
                      <option>JERSEY ISLAND</option>
                      <option>JORDAN</option>
                    </optgroup>

                    <optgroup label="K">
                      <option>KAZAKHSTAN</option>
                      <option>KENYA</option>
                      <option>KUWAIT</option>
                      <option>KYRGYZSTAN</option>
                    </optgroup>

                    <optgroup label="L">
                      <option>LAOS</option>
                      <option>LATVIA</option>
                      <option>LIECHTENSTEIN</option>
                      <option>LITHUANIA</option>
                      <option>LUXEMBOURG</option>
                    </optgroup>

                    <optgroup label="M">
                      <option>MACAU</option>
                      <option>MACEDONIA</option>
                      <option>MADAGASCAR</option>
                      <option>MALAWI</option>
                      <option>MALAYSIA</option>
                      <option>MALTA</option>
                      <option>MARTINIQUE</option>
                      <option>MEXICO</option>
                      <option>MOLDOVA</option>
                      <option>MONGOLIA</option>
                      <option>MONTENEGRO</option>
                      <option>MONTSERRAT</option>
                      <option>MOROCCO</option>
                      <option>MOZAMBIQUE</option>
                      <option>MYANMAR</option>
                    </optgroup>

                    <optgroup label="N">
                      <option>NAMIBIA</option>
                      <option>NAURU</option>
                      <option>NEPAL</option>
                      <option>NETHERLANDS</option>
                      <option>NETHERLANDS ANTILLES</option>
                      <option>NEW ZEALAND</option>
                      <option>NICARAGUA</option>
                      <option>NIGERIA</option>
                      <option>NORTHERN IRELAND</option>
                      <option>NORWAY</option>
                    </optgroup>

                    <optgroup label="O">
                      <option>OMAN</option>
                    </optgroup>

                    <optgroup label="P">
                      <option>PAKISTAN</option>
                      <option>PALESTINE</li>
                      <option>PANAMA</li>
                      <option>PAPUA NEW GUINEA</li>
                      <option>PARAGUAY</option>
                      <option>PERU</option>
                      <option>PHILIPPINES</option>
                      <option>POLAND</option>
                      <option>PORTUGAL</option>
                    </optgroup>

                    <optgroup label="Q">
                      <option>QATAR</option>
                    </optgroup>

                    <optgroup label="R">
                      <option>ROMANIA</option>
                      <option>RUSSIAN FEDERATION</option>
                      <option>RWANDA</option>
                    </optgroup>

                    <optgroup label="S">
                      <option>SAINT KITTS & NEVIS</option>
                      <option>SAINT MARTIN(FRENCH)</option>
                      <option>SAUDI ARABIA</option>
                      <option>SCOTLAND</option>
                      <option>SENEGAL</option>
                      <option>SERBIA</option>
                      <option>SINGAPORE</option>
                      <option>SINT MAARTEN(DUTCH)</option>
                      <option>SLOVAKIA</option>
                      <option>SLOVENIA</option>
                      <option>SOUTH AFRICA</option>
                      <option>SOUTH KOREA</option>
                      <option>SPAIN</option>
                      <option>SRI LANKA</option>
                      <option>ST BARTHELEMY</option>
                      <option>ST LUCIA</option>
                      <option>ST VINCENT AND THE GRENADINES</option>
                      <option>SURINAME</option>
                      <option>SWEDEN</option>
                      <option>SWITZERLAND</option>
                    </optgroup>

                    <optgroup label="T">
                      <option>TAIWAN</option>
                      <option>TAJIKISTAN</option>
                      <option>TANZANIA</option>
                      <option>THAILAND</option>
                      <option>TONGA</option>
                      <option>TRINIDAD AND TOBAGO</option>
                      <option>TUNISIA</option>
                      <option>TURKEY</option>
                      <option>TURKS & CAICOS ISLANDS</option>
                    </optgroup>

                    <optgroup label="U">
                      <option>UGANDA</option>
                      <option>UKRAINE</option>
                      <option>UNITED ARAB EMIRATES</option>
                      <option>UNITED KINGDOM</option>
                      <option>UNITED STATES</option>
                      <option>URUGUAY</option>
                      <option>UZBEKISTAN</option>
                    </optgroup>

                    <optgroup label="V">
                      <option>VANUATU</option>
                      <option>VENEZUELA</option>
                      <option>VIETNAM</option>
                      <option>VIRGIN ISLANDS BRITISH</option>
                      <option>VIRGIN ISLANDS U.S</option>
                    </optgroup>

                    <optgroup label="W">
                      <option>WALES</option>
                    </optgroup>

                    <optgroup label="Z">
                      <option>ZAMBIA</option>
                      <option>ZIMBABWE</option>
                    </optgroup>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="inner-box">
          <h5>Internet data</h5>
          <div class="item-box my-3">
            <div class="row">
              <div class="col-sm-2 d-flex justify-content-center align-items-center">
                <img src="img/icons/icon2-r.png" alt="icon1" width="30" height="30" />
              </div>

              <div class="row col-sm-10">
                <div class="col-sm-6 bs-select-wrapper" data-type="gbAmount" id="enter-gb">
                  <select class="form-control selectpicker" name="gb" data-live-search="true"
                    data-live-search-placeholder="Custom Gb" data-live-search-style="startsWith" data-title="Enter Gb"
                    data-width="100%" data-dropup-auto="false">
                    <!-- <option selected>Enter Gb</option> -->
                    <option value="1">1 Gb</option>
                    <option value="3">3 Gb</option>
                    <option value="5">5 Gb</option>
                    <option value="10">10 Gb</option>
                    <option value="15">15 Gb</option>
                    <option value="20">20 Gb</option>
                    <option value="30">30 Gb</option>
                    <option value="40">40 Gb</option>
                    <option value="50">50 Gb</option>
                    <option value="70">70 Gb</option>
                    <option value="100">100 Gb</option>
                  </select>
                </div>

                <div class="col-sm-6 bs-select-wrapper" data-type="period" id="enter-period">
                  <select class="form-control selectpicker" name="period" data-title="Enter period" data-width="100%"
                    data-dropup-auto="false">
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="28">28 days</option>
                    <option value="56">56 days</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="inner-box" style="display: none;" data-service="voice-sms">
          <h5>Voice / SMS* <span>(*Sending / receiving SMS only by mail</span></h5>
          <div class="item-box my-3">
            <div class="row">
              <div class="col-sm-2 d-flex justify-content-center align-items-center">
                <img src="img/icons/icon5-r.png" alt="icon1" width="42" height="35" />
              </div>

              <div class="row col-sm-10">
                <div class="col-sm-6 bs-select-wrapper" data-type="balance" id="enter-balance">
                  <select class="form-control selectpicker" name="VSbalance" data-live-search="true"
                    data-live-search-placeholder="Custom Balance" data-live-search-style="startsWith"
                    data-title="Enter Balance $" data-width="100%" data-dropup-auto="false">
                    <!-- <option selected>Enter Balance $</option> -->
                    <option value="1">1 $</option>
                    <option value="3">3 $</option>
                    <option value="5">5 $</option>
                    <option value="10">10 $</option>
                    <option value="15">15 $</option>
                    <option value="20">20 $</option>
                    <option value="30">30 $</option>
                    <option value="40">40 $</option>
                    <option value="50">50 $</option>
                    <option value="70">70 $</option>
                    <option value="100">100 $</option>
                  </select>
                </div>
                <div class="col-sm-6 bs-select-wrapper" data-type="VSperiod" id="VS-period">
                  <select class="form-control selectpicker" name="VSperiod" data-title="Enter period" data-width="100%"
                    data-dropup-auto="false">
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="28">28 days</option>
                    <option value="56">56 days</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="inner-box" style="display: none;" data-service="virtual-number">
          <h5>Virtual number</h5>
          <div class="item-box my-3">
            <div class="row">
              <div class="col-sm-2 d-flex justify-content-center align-items-center">
                <img src="img/icons/icon3-r-list.png" alt="icon1" width="56" height="56" />
              </div>
              <div class="col-sm-4 bs-select-wrapper" data-type="virtualPeriod">
                <select class="form-control selectpicker" name="Vperiod" data-title="Enter period" data-width="100%"
                  data-dropup-auto="false">
                  <option value="1">1 month</option>
                  <option value="3">3 month</option>
                  <option value="6">6 month</option>
                  <option value="12">12 month</option>
                </select>
              </div>
              <div class="col-sm-4"></div>
              <div class="join-info col-sm-9 ml-auto" style="display: none;">
                <div class="location-info">
                  <span>Country:</span><span class="country-name"></span>
                  /
                  <span>Region: </span><span class="region-name"></span>
                </div>
                <div class="number-info">
                  <span>Virtual number: </span><span class="virtual-number"></span>
                </div>
              </div>
              <div class="inner-box virtual-inner col-sm-9 ml-auto">
                <h5>Please make your choice</h5>
                <div class="row">
                  <div class="col-sm-6 bs-select-wrapper my-3" id="countries-select">
                    <select class="form-control selectpicker" name="Vcountry" data-live-search="true"
                      data-live-search-style="startsWith" data-title="Select country" data-width="100%"
                      data-dropup-auto="false">
                      <!-- <option selected>Select country</option> -->
                      <optgroup label="A">
                        <option>ALBANIA</option>
                        <option>ALGERIA</option>
                        <option>ANGUILLA</option>
                        <option>ANTIGUA AND BARBUDA</option>
                        <option>ARMENIA</option>
                        <option>AUSTRALIA</option>
                        <option>AUSTRIA</option>
                        <option>AZERBAIJAN</option>
                      </optgroup>

                      <optgroup label="B">
                        <option>BAHRAIN</option>
                        <option>BANGLADESH</option>
                        <option>BARBADOS</option>
                        <option>BELARUS</option>
                        <option>BELGIUM</option>
                        <option>BELIZE</option>
                        <option>BOSNIA & HERZEGOVINA</option>
                        <option>BRAZIL</option>
                        <option>BRUNEI</option>
                        <option>BULGARIA</option>
                        <option>BURKINA FASO</option>
                      </optgroup>

                      <optgroup label="C">
                        <option>CAMBODIA</option>
                        <option>CAMEROON</option>
                        <option>CANADA</option>
                        <option>CAYMAN ISLANDS</option>
                        <option>CHAD</option>
                        <option>CHILE</option>
                        <option>CHINA</option>
                        <option>COLOMBIA</option>
                        <option>CONGO</option>
                        <option>CONGO DEM REP</option>
                        <option>COSTA RICA</option>
                        <option>COTE D'IVOIRE (IVORY COAST)</option>
                        <option>CROATIA</option>
                        <option>CURACAO</option>
                        <option>CYPRUS</option>
                        <option>CZECH REPUBLIC</option>
                      </optgroup>

                      <optgroup label="D">
                        <option>DENMARK</option>
                        <option>DOMINICA</option>
                      </optgroup>

                      <optgroup label="E">
                        <option>ECUADOR</option>
                        <option>EGYPT</option>
                        <option>EL SALVADOR</option>
                        <option>ESTONIA</option>
                        <option>ETHIOPIA</option>
                      </optgroup>

                      <optgroup label="F">
                        <option>FAROE ISLANDS</option>
                        <option>FIJI</option>
                        <option>FINLAND</option>
                        <option>FRANCE</option>
                        <option>FRENCH GUIANA</option>
                      </optgroup>

                      <optgroup label="G">
                        <option>GABON</option>
                        <option>GEORGIA</option>
                        <option>GERMANY</option>
                        <option>GHANA</option>
                        <option>GIBRALTAR</option>
                        <option>GREECE</option>
                        <option>GREENLAND</option>
                        <option>GRENADA</option>
                        <option>GUADELOUPE</option>
                        <option>GUINEA</option>
                        <option>GUYANA</option>
                      </optgroup>

                      <optgroup label="H">
                        <option>HAITI</option>
                        <option>HAWAII - USA</option>
                        <option>HONDURAS</option>
                        <option>HONG KONG</option>
                        <option>HUNGARY</option>
                      </optgroup>

                      <optgroup label="I">
                        <option>ICELAND</option>
                        <option>INDIA</option>
                        <option>INDONESIA</option>
                        <option>IRAN</option>
                        <option>IRELAND</option>
                        <option>ISRAEL</option>
                        <option>ITALY</option>
                      </optgroup>

                      <optgroup label="J">
                        <option>JAMAICA</option>
                        <option>JAPAN</option>
                        <option>JERSEY ISLAND</option>
                        <option>JORDAN</option>
                      </optgroup>

                      <optgroup label="K">
                        <option>KAZAKHSTAN</option>
                        <option>KENYA</option>
                        <option>KUWAIT</option>
                        <option>KYRGYZSTAN</option>
                      </optgroup>

                      <optgroup label="L">
                        <option>LAOS</option>
                        <option>LATVIA</option>
                        <option>LIECHTENSTEIN</option>
                        <option>LITHUANIA</option>
                        <option>LUXEMBOURG</option>
                      </optgroup>

                      <optgroup label="M">
                        <option>MACAU</option>
                        <option>MACEDONIA</option>
                        <option>MADAGASCAR</option>
                        <option>MALAWI</option>
                        <option>MALAYSIA</option>
                        <option>MALTA</option>
                        <option>MARTINIQUE</option>
                        <option>MEXICO</option>
                        <option>MOLDOVA</option>
                        <option>MONGOLIA</option>
                        <option>MONTENEGRO</option>
                        <option>MONTSERRAT</option>
                        <option>MOROCCO</option>
                        <option>MOZAMBIQUE</option>
                        <option>MYANMAR</option>
                      </optgroup>

                      <optgroup label="N">
                        <option>NAMIBIA</option>
                        <option>NAURU</option>
                        <option>NEPAL</option>
                        <option>NETHERLANDS</option>
                        <option>NETHERLANDS ANTILLES</option>
                        <option>NEW ZEALAND</option>
                        <option>NICARAGUA</option>
                        <option>NIGERIA</option>
                        <option>NORTHERN IRELAND</option>
                        <option>NORWAY</option>
                      </optgroup>

                      <optgroup label="O">
                        <option>OMAN</option>
                      </optgroup>

                      <optgroup label="P">
                        <option>PAKISTAN</option>
                        <option>PALESTINE</li>
                        <option>PANAMA</li>
                        <option>PAPUA NEW GUINEA</li>
                        <option>PARAGUAY</option>
                        <option>PERU</option>
                        <option>PHILIPPINES</option>
                        <option>POLAND</option>
                        <option>PORTUGAL</option>
                      </optgroup>

                      <optgroup label="Q">
                        <option>QATAR</option>
                      </optgroup>

                      <optgroup label="R">
                        <option>ROMANIA</option>
                        <option>RUSSIAN FEDERATION</option>
                        <option>RWANDA</option>
                      </optgroup>

                      <optgroup label="S">
                        <option>SAINT KITTS & NEVIS</option>
                        <option>SAINT MARTIN(FRENCH)</option>
                        <option>SAUDI ARABIA</option>
                        <option>SCOTLAND</option>
                        <option>SENEGAL</option>
                        <option>SERBIA</option>
                        <option>SINGAPORE</option>
                        <option>SINT MAARTEN(DUTCH)</option>
                        <option>SLOVAKIA</option>
                        <option>SLOVENIA</option>
                        <option>SOUTH AFRICA</option>
                        <option>SOUTH KOREA</option>
                        <option>SPAIN</option>
                        <option>SRI LANKA</option>
                        <option>ST BARTHELEMY</option>
                        <option>ST LUCIA</option>
                        <option>ST VINCENT AND THE GRENADINES</option>
                        <option>SURINAME</option>
                        <option>SWEDEN</option>
                        <option>SWITZERLAND</option>
                      </optgroup>

                      <optgroup label="T">
                        <option>TAIWAN</option>
                        <option>TAJIKISTAN</option>
                        <option>TANZANIA</option>
                        <option>THAILAND</option>
                        <option>TONGA</option>
                        <option>TRINIDAD AND TOBAGO</option>
                        <option>TUNISIA</option>
                        <option>TURKEY</option>
                        <option>TURKS & CAICOS ISLANDS</option>
                      </optgroup>

                      <optgroup label="U">
                        <option>UGANDA</option>
                        <option>UKRAINE</option>
                        <option>UNITED ARAB EMIRATES</option>
                        <option>UNITED KINGDOM</option>
                        <option>UNITED STATES</option>
                        <option>URUGUAY</option>
                        <option>UZBEKISTAN</option>
                      </optgroup>

                      <optgroup label="V">
                        <option>VANUATU</option>
                        <option>VENEZUELA</option>
                        <option>VIETNAM</option>
                        <option>VIRGIN ISLANDS BRITISH</option>
                        <option>VIRGIN ISLANDS U.S</option>
                      </optgroup>

                      <optgroup label="W">
                        <option>WALES</option>
                      </optgroup>

                      <optgroup label="Z">
                        <option>ZAMBIA</option>
                        <option>ZIMBABWE</option>
                      </optgroup>
                    </select>
                  </div>
                  <div class="col-sm-6 bs-select-wrapper my-3" id="regions-list">
                    <select disabled class="form-control selectpicker" name="Vregion" data-title="Select region"
                      data-width="100%" data-dropup-auto="false">

                    </select>
                  </div>
                  <div class="col-sm-6 bs-select-wrapper my-3" id="prefix-select">
                    <select disabled class="form-control selectpicker" name="Vprefix" data-title="Select Prefix"
                      data-width="100%" data-dropup-auto="false">
                      <option value="Canmore/1587">Canmore (+1587)</option>
                      <option value="Blackfalds/1587">Blackfalds (+1578)</option>
                      <option value="Calgary/1587">Calgary (+1578)</option>
                      <option value="Edson/1587">Edson (+1578)</option>
                      <option value="Lloydminster/1587">Lloydminster (+1578)</option>
                      <option value="Medicnine Hat/1587">Medicnine Hat (+1578)</option>
                      <option value="Olds/1587">Olds (+1578)</option>
                    </select>
                  </div>
                  <div class="col-sm-6 bs-select-wrapper my-3" id="numbers-list">
                    <select disabled class="form-control selectpicker" name="Vnumber" data-title="Select Number"
                      data-width="100%" data-dropup-auto="false">
                      <option value="15872063728">15872063728</option>
                      <option value="15872063729">15872063729</option>
                      <option value="15872063730">15872063730</option>
                      <option value="15872063731">15872063731</option>
                      <option value="15872063732">15872063732</option>
                      <option value="15872063733">15872063733</option>
                      <option value="15872063734">15872063734</option>
                      <option value="15872063735">15872063735</option>
                      <option value="15872063736">15872063736</option>
                      <option value="15872063737">15872063737</option>
                    </select>
                  </div>
                  <button type="button" disabled class="btn-join-to-card py-2 px-5 mt-1 ml-auto mr-3">JOIN</button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="inner-box" style="display: none;" data-service="substitution-number">
        <h5>Substitution of numbers</h5>
        <div class="item-box my-3">
          <div class="row">
            <div class="col-sm-2 d-flex justify-content-center align-items-center">
              <img src="img/icons/icon4-r.png" alt="icon1" width="36" height="35" />
            </div>

            <div class="col-sm-4 bs-select-wrapper">
              <select class="form-control selectpicker" name="subPeriod" data-title="Enter period" data-width="100%"
                data-dropup-auto="false">
                <option value="1">1 month</option>
                <option value="3">3 month</option>
                <option value="6">6 month</option>
                <option value="12">12 month</option>
              </select>
            </div>
            <div class="col-sm-4 input-placeholder" style="display: none;"></div>
            <div class="col-sm-9 ml-auto substitution-join" style="display: none;">
              <div class="location-info">
                <span>Your virtual number</span><span class="virtual-number"></span>
              </div>
              <div class="substitution-info">
                <span>Your substitution number</span>
                <span class="substitution-number"></span>
              </div>
            </div>
            <div class="col-sm-4 virtual-number-info">
              <span>Your virtual number</span>
              <div class="virtual-number-wrapper d-flex align-items-center">
                <img src="img/icons/icon3-r.png" width="20" height="20" alt="icon">
                <p class="virtual-number">N/A</p>
              </div>
            </div>
            <div class="col-sm-9 ml-auto mt-3 substitution-wrapper inner-box">
              <h5>Please enter a substitution number</h5>
              <div class="d-flex align-items-center justify-content-between">
                <input type="text" class="form-control col-sm-7" id="subNumber" placeholder="Substitution number"
                  name="subNumber" value="">
                <button type="button" disabled
                  class="btn-join-to-card py-1 px-5 mt-1 btn-substitution-join">JOIN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-box">
        <h5>Add to plan</h5>
        <div class="additional-services d-flex my-3 flex-wrap align-items-end justify-content-between">
          <div class="service__item d-flex flex-column align-items-center">
            <img src="img/icons/icon5-r.png" alt="icon1">
            <button data-item="${counter+1}" type="button" data-names="VSbalance,VSperiod" class="btn-service-toggler"
              data-target="#voice-sms">
              <span>+</span>
              <span>Voice and SMS</span>
            </button>
          </div>
          <div class="services__line"></div>
          <div class="service__item d-flex flex-column align-items-center">
            <img src="img/icons/icon3-r.png" alt="icon1">
            <button data-item="${counter+1}" type="button" data-names="Vperiod,Vregion,Vcountry,Vprefix,Vnumber" class="btn-service-toggler"
              data-target="#virtual-number">
              <span>+</span>
              <span>Virtual number</span>
            </button>
          </div>
          <div class="services__line"></div>
          <div class="service__item d-flex flex-column align-items-center">
            <img src="img/icons/icon4-r.png" alt="icon1">
            <button data-item="${counter+1}" type="button" data-names="subPeriod,subNumber" class="btn-service-toggler"
              data-target="#substitution-number">
              <span>+</span>
              <span>Substitution of numbers</span>
            </button>
          </div>
        </div>
      </div>
      <div class="tabs my-4 inner-box">
        <h5>Card selection</h5>
        <div class="form my-3">
          <div class="sims-box">
            <div class="sim__item">
              <input type="radio" checked id="sims-esim" value="eSim" name="simToBeSelected">
              <label for="sims-esim">
                <div class="circle"></div>
                <div class="img-wrapper">
                  <img src="img/icons/left-sim-r.png" alt="esim"><img src="img/icons/left-sim-hover-r.png"
                    alt="esim">
                </div>
                <span>eSim</span>
              </label>
              <button type="button" class="btn btn-show-sim-info" data-sim="#sims-esim" data-target="#phone-support">?</button>
            </div>
            <div class="line"></div>
            <div class="sim__item">
              <input type="radio" id="sims-sim" value="Sim" name="simToBeSelected">
              <label for="sims-sim">
                <div class="circle"></div>
                <div class="img-wrapper">
                  <img src="img/icons/right-sim-r.png" alt="sim"><img src="img/icons/right-sim-hover-r.png"
                    alt="sim">
                </div>
                <span>Sim</span>
              </label>
              <button type="button" class="btn btn-show-sim-info" data-sim="#sims-sim" data-target="#shipping-info">?</button>
            </div>
          </div>
        </div>
      </div>
      <div class="tabs-wrapper">
        <div class="tab-item" id="phone-support" style="display: none;">
          <div>
            <div class="title-box">
              <p>Apple iPhones</p>
              <span class="tit-line"></span>
            </div>

            <ul>
              <li>iPhone 11</li>
              <li>iPhone 11 Pro</li>
              <li>iPhone 11 Pro Max</li>
              <li>iPhone XS</li>
              <li>iPhone XS Max</li>
              <li>iPhone XS Max Global</li>
              <li>iPhone XR</li>
            </ul>

            <div class="title-box">
              <p>Apple iPads</p>
              <span class="tit-line"></span>
            </div>

            <ul>
              <li>iPad Pro 3rd Gen (12.9 inch, WiFi+Cellular)</li>
              <li>iPad Pro 3rd Gen (12.9 inch, 1TB, WiFi+Cellular)</li>
              <li>iPad mini 5th Gen</li>
              <li>iPad Air 3rd Gen</li>
            </ul>
            <div class="title-box">
              <p>Google</p>
              <span class="tit-line"></span>
            </div>

            <ul>
              <li>Pixel 3</li>
              <li>Pixel 3 XL</li>
              <li>Pixel 4</li>
            </ul>
            <div class="title-box">
              <p>Samsung</p>
              <span class="tit-line"></span>
            </div>

            <ul>
              <li>Galaxy Fold LTE</li>
              <li>Samsung Galaxy Z Flip</li>
              <li>Samsung Galaxy S20, s20+ and S20 Ultra</li>
              <li style="list-style: none;">
                (Single SIM Nano-SIM and/or eSIM models )
              </li>
            </ul>
            <div class="under-footer">
              <ul>
                <li>* Not compatible with carrier-locked phone</li>
                <li>
                  * Not compatible with iPhone XR, XS models and 11 models
                  purchased in Hong Kong, Macau and Mainland China
                </li>
                <li>
                  * Not compatible with iPhones with 2 physical SIM card slots
                </li>
                <li>
                  * Not compatible with Pixel devices purchased in Australia
                </li>
                <li>
                  * Not compatible with devices on Android Q Beta versions
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-item" id="shipping-info" style="display: none;">
          <div>
            <p class="info-text">When you ship with DHL Express – you’re shipping
              with specialists in international shipping and courier
              delivery services! With our wide range of express
              parcel and package services, along with shipping
              and tracking solutions to fit your needs – learn how
              DHL Express can deliver!</p>
            <input type="checkbox" name="dhl" checked id="dhl-checkbox">
            <label class="dhl-checkbox-label" for="dhl-checkbox"><span> </span> <img src="img/icons/dhl.png"
                alt="dhl"></label>
          </div>
        </div>
      </div>
    </div>
  </form>


  <div class="shopping-card__card js-shopping-card__card col-lg-4 col-md-12" data-item="${counter+1}">
    <div class="item">
      <div class="top1">
        <img src="img/logo.svg" alt="logo">
        <span class="right-span">
          <div class="text tariff-name js-tariff-name">${data.label == "BUSINESS" ? "PROMAX" : data.label}</div>
        </span>
      </div>

      <h1><span class="let  gb-amount-big js-gb-amount-big">${data.amount}</span> Gb</h1>
      <div class="top2">
        <h4><span class="plan-name js-plan-name">${data.plan} plan</span><span class="sim-type"><span
              class="sim-name js-sim-name">${data.simType}</span></span></h4>
        <span class="line"></span>
      </div>
      <div class="top3">
        <h3 class="my-3 js-included-country-text">Included in your plan:</h3>

        <div class="js-not-sorted-items">
          <div class="included-item" data-item="${counter+1}" data-label="internet-data-box">
            <div class="img-wrapper">
              <img src="img/icons/icon2.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left">
                <h3 class="item-name">Internet data</h3>
                <p class="item-period"><span class="gb-amount">${data.amount}Gb</span>/<span class="day-amount">${data.priceData.days} days</span></p>
              </div>
              <div class="content-right">
                $ <span class="price-amount internet-price-amount">${data.priceData.price}</span> us
              </div>
            </div>
          </div>
          <div  style="display: none;" class="included-item" data-item="${counter+1}" data-label="voice-sms-box">
            <div class="img-wrapper">
              <img src="img/icons/icon5.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left">
                <h3 class="item-name">Voice / sms</h3>
                <p class="item-period"><span class="day-amount js-vs-day-amount">7 days</span></p>
              </div>
              <div class="content-right">
                $ <span class="price-amount js-vs-price">1 000</span> us
              </div>
            </div>
          </div>
          <div style="display: none;" class="included-item" data-item="${counter+1}" data-label="virtual-number-box">
            <div class="img-wrapper">
              <img width="auto" height="100%" src="img/icons/icon3.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left">
                <h3 class="item-name">virtual number</h3>
                <p class="item-period"><span class="day-amount v-day-amount js-v-day-amount">1 month</span></p>
              </div>
              <div class="content-right">
                $ <span class="price-amount">500</span> us
              </div>
            </div>
          </div>
          <div style="display: none;" class="included-item" data-item="${counter+1}" data-label="substitution-number-box">
            <div class="img-wrapper">
              <img src="img/icons/icon4.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left">
                <h3 class="item-name">substitution of
                  number</h3>
                <p class="item-period"><span class="day-amount js-day-amount js-sub-period">1 month</span></p>
              </div>
              <div class="content-right">
                $ <span class="js-price-amount price-amount">25</span> us
              </div>
            </div>
          </div>
          <div class="included-item js-sim-type-box">
            <div class="img-wrapper">
              <img class="sim-img" src="img/icons/left-sim.png" alt="icon1">
            </div>
            <div class="item-content d-flex ml-auto justify-content-between">
              <div class="content-left d-flex align-items-baseline">
                <h3 class="item-name sim-name js-sim-name">">${data.simType}</h3>
                <span class="sim-price-status">free</span>
                ${data.isDhl ? '<img width="45" height="10" src="img/icons/dhl.png" class="ml-2" alt="dhl">' : ''}
              </div>
              <div class="content-right">
                $ <span data-free="yes" class="price-amount js-price-amount">0</span> us
              </div>
            </div>
          </div>
        </div>
        
        <span class="line"></span>
        <div class="total-price mt-3">$ <span class="total-price-amount js-total-price-amount">${data.priceData.price}</span> us</div>
        <button style="display: none;" type="button" data-approve="yes" class="btn-checkout mt-3">Approved</button>
      </div>
    </div>
  </div>

</div>`
}