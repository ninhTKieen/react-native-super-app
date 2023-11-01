import storeService from '@/features/store/store.service';
import {useQuery} from '@tanstack/react-query';

type Props = {
  province?: any;
  district?: any;
  ward?: any;
};

export const usePosition = ({province, district, ward}: Props) => {
  const {data: provinces, isLoading: isProvinceLoading} = useQuery({
    queryKey: ['provinces'],
    queryFn: () => storeService.getProvinces(),
    staleTime: Infinity,
  });

  const {data: districts, isLoading: isDistrictLoading} = useQuery({
    queryKey: ['districts', province],
    queryFn: () => storeService.getDistricts(province),
    staleTime: Infinity,
  });

  const {data: wards, isLoading: isWardLoading} = useQuery({
    queryKey: ['wards', district],
    queryFn: () => storeService.getWards(district),
    staleTime: Infinity,
  });

  return {
    provinces,
    districts,
    wards,
    isProvinceLoading,
    isDistrictLoading,
    isWardLoading,
  };
};
