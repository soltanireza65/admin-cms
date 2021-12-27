import i18next from 'i18next';
import fa from 'app/main/shared-components/tags/i18n/fa';
import en from 'app/main/shared-components/tags/i18n/en';
import commonFa from 'i18n/common/fa';
import commonEn from 'i18n/common/en';
i18next.addResourceBundle('en', 'tagApp', en);
i18next.addResourceBundle('fa', 'tagApp', fa);
i18next.addResourceBundle('en', 'common', commonEn);
i18next.addResourceBundle('fa', 'common', commonFa);
