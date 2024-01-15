type IResponseData<T> = {
  data: T[];
  pagination: IPagination;
};

type IResponse<T> = {
  data: T;
};
