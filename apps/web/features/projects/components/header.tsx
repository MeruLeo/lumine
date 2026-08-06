"use client";

import { SearchIcon } from "@/shared/components/icons";
import { Button, ListBox, SearchField, Select } from "@heroui/react";
import { FormEvent, useState } from "react";
import { provincesOptions } from "../services/provinces";
import { useQuery } from "@tanstack/react-query";

interface HeaderProjectsProps {
  onSearch: (params: { search?: string; province?: number }) => void;
  initialSearch?: string;
  initialProvince?: number;
}

export const HeaderProjects = ({
  onSearch,
  initialSearch = "",
  initialProvince,
}: HeaderProjectsProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [province, setProvince] = useState<number | undefined>(initialProvince);

  const { data: provinces, isLoading: isProvincesLoading } =
    useQuery(provincesOptions());

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch({
      search: search.trim() || undefined,
      province,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-fit flex-wrap gap-4 rounded-2xl bg-text-on-accent-light p-2 dark:bg-text-on-accent-dark"
    >
      <SearchField
        name="search"
        value={search}
        onChange={setSearch}
        className="w-full sm:w-[256px]"
      >
        <SearchField.Group>
          <SearchField.SearchIcon style={{ margin: 0, marginRight: "1rem" }} />
          <SearchField.Input placeholder="جستجو در نام، کارفرما و ..." />
          <SearchField.ClearButton style={{ margin: 0, marginLeft: "1rem" }} />
        </SearchField.Group>
      </SearchField>

      <Select
        className="w-full sm:w-[256px]"
        placeholder="استان"
        selectedKey={province ? String(province) : null}
        onSelectionChange={(key) => {
          if (!key) {
            setProvince(undefined);
            return;
          }

          setProvince(Number(key));
        }}
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            {provinces?.map((item) => (
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

      <Button type="submit" className="w-full sm:w-[100px]">
        جستجو
        <SearchIcon />
      </Button>
    </form>
  );
};
