import * as Components from '../../index';
import * as Calendar from '../../internal/Calendar';
import * as CalendarMonthView from '../../internal/Calendar/MonthView';
import * as CustomComboBox from '../../internal/CustomComboBox';
import * as CustomComboBoxComboBoxView from '../../internal/CustomComboBox/ComboBoxView';
import * as DateSelect from '../../internal/DateSelect';
import * as InputLikeText from '../../internal/InputLikeText';
import * as InternalMenu from '../../internal/InternalMenu';
import * as MaskedInput from '../../internal/MaskedInput';
import * as Menu from '../../internal/Menu';
import * as Popup from '../../internal/Popup';
import * as PopupPin from '../../internal/Popup/PopupPin';
import * as MobilePopupDataTid from '../../internal/MobilePopup';
import * as PopupMenu from '../../internal/PopupMenu';

const allComponents = {
  ...Components,
  ...Calendar,
  ...CalendarMonthView,
  ...CustomComboBox,
  ...CustomComboBoxComboBoxView,
  ...DateSelect,
  ...InputLikeText,
  ...InternalMenu,
  ...MaskedInput,
  ...Menu,
  ...Popup,
  ...PopupPin,
  ...MobilePopupDataTid,
  ...PopupMenu,
};

const tids = Object.keys(allComponents).filter((componentName) => {
  if (componentName.match(/datatid/i)) {
    return componentName;
  }
});

export const componentsDataTid: { [key: string]: { [key: string]: string } } = tids.reduce((accum, currTid) => {
  return {
    ...accum,
    [allComponents[currTid].origin]: {
      [currTid]: Object.entries(allComponents[currTid])
        .map((x) => {
          if (typeof x[1] === 'object') {
            return `${Object.entries(x[1])
              .map((y) => `${x[0]}.${y.join(':')}`)
              .join(', \n')}`;
          }
          return x.join(':');
        })
        .join(', \n'),
    },
  };
}, {});
