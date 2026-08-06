import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { setRole, setCategory, getCategories } from "../api/auth_3";
import { UserRole } from "../types/auth_3";

export const setRoleOptions = () => mutationOptions({ mutationFn: setRole });

export const setCategoryOptions = () =>
  mutationOptions({ mutationFn: setCategory });

export const categoriesQueryOptions = (role: UserRole) =>
  queryOptions({
    queryKey: ["auth-categories", role],
    queryFn: () => getCategories(role),
  });
