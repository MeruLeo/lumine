"use client";

import { SearchIcon } from "@/shared/components/icons";
import { Briefcase } from "@gravity-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, ListBox, SearchField, Select } from "@heroui/react";
import type { FormEvent, Key, ReactNode } from "react";
import { useState } from "react";

import { provincesOptions } from "../services/provinces";
import type { GetProjectsParams } from "../types/project-query";

interface HeaderProjectsProps {
  onSearch: (params: GetProjectsParams) => void;
  initialSearch?: string;
  initialProvince?: number;
  action?: ReactNode;
}

export const HeaderProjects = ({
  onSearch,
  initialSearch = "",
  initialProvince,
  action,
}: HeaderProjectsProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [province, setProvince] = useState<number | undefined>(initialProvince);

  const {
    data: provinces = [],
    isLoading: isProvincesLoading,
    isError: isProvincesError,
  } = useQuery(provincesOptions());

  const handleProvinceChange = (key: Key | null) => {
    if (key === null) {
      setProvince(undefined);
      return;
    }

    const provinceId = Number(key);

    if (Number.isFinite(provinceId)) {
      setProvince(provinceId);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch({
      search: search.trim() || undefined,
      province,
    });
  };

  return (
    <header className="flex w-full flex-col gap-5">
      {/* Page title and primary action */}
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Briefcase className="size-5" />
          </span>

          <div className="min-w-0">
            <h1 className="text-base font-semibold text-foreground">
              پروژه‌ها
            </h1>

            <p className="mt-1 line-clamp-1 text-xs text-text-secondary-light dark:text-text-secondary-dark">
              مشاهده، جست‌وجو و مدیریت پروژه‌ها
            </p>
          </div>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      {/* Search and filters */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="جست‌وجو و فیلتر پروژه‌ها"
        className="bg-base-light dark:bg-base-dark p-2 rounded-2xl grid w-full grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_14rem_auto] lg:max-w-3xl"
      >
        <SearchField
          name="search"
          value={search}
          onChange={setSearch}
          className="w-full"
          aria-label="جست‌وجو در پروژه‌ها"
        >
          <SearchField.Group>
            <SearchField.SearchIcon
              style={{ margin: 0, marginRight: "1rem" }}
            />

            <SearchField.Input placeholder="نام پروژه یا کارفرما" />

            <SearchField.ClearButton
              style={{ margin: 0, marginLeft: "1rem" }}
            />
          </SearchField.Group>
        </SearchField>

        <Select
          className="w-full"
          placeholder={
            isProvincesLoading
              ? "در حال دریافت استان‌ها..."
              : isProvincesError
                ? "خطا در دریافت استان‌ها"
                : "همه استان‌ها"
          }
          aria-label="فیلتر پروژه‌ها بر اساس استان"
          selectedKey={province !== undefined ? String(province) : null}
          onSelectionChange={handleProvinceChange}
          isDisabled={isProvincesLoading || isProvincesError}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {provinces.map((item) => (
                <ListBox.Item
                  key={item.id}
                  id={String(item.id)}
                  textValue={item.name}
                >
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Button
          type="submit"
          className="w-full shrink-0 gap-2 sm:w-auto sm:min-w-24"
        >
          <SearchIcon />
          جست‌وجو
        </Button>
      </form>
    </header>
  );
};
