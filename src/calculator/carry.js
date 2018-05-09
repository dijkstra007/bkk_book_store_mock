import * as ADDRESS from "../constants/address";
import * as CARRY from "../constants/carry";
import * as _ from "lodash";

export const getTransportationPrice = (type, province) => {
  const isNearBangkok = isInBangkokAndMetropolitianRegion(province);

  switch (type) {
    case CARRY.THAILAND_POST.REGISTER.type:
      return 30;
    case CARRY.THAILAND_POST.EMS.type:
      return 50;
    case CARRY.QUANTIUM_SOLUTIONS.type:
      return 50;
    default:
      return 0;
  }
};

export const isInBangkokAndMetropolitianRegion = province => {
  return _.includes(ADDRESS.BANGKOK_METROPOLITAN_REGION_LIST, province);
};
