"use client";

import { Button, ListBox, SearchField, Select } from "@heroui/react";
import {
  NotificationFiltersState,
  NotificationType,
} from "../types/notification";
import { NotificationBadge } from "./notification-badge";
import { CircleCheckFill } from "@gravity-ui/icons";

interface NotificationFiltersProps {
  value: NotificationFiltersState;
  onChange: (value: NotificationFiltersState) => void;
  unreadCount: number;
  markAllAsSeen: () => void;
}

const notificationTypes: Array<{
  label: string;
  value: NotificationType | "all";
}> = [
  { label: "همه نوع‌ها", value: "all" },
  { label: "سیستم", value: "system" },
  { label: "پروموشن", value: "promotion" },
  { label: "هشدار", value: "warning" },
  { label: "اطلاعات", value: "info" },
];

export function NotificationFilters({
  value,
  onChange,
  unreadCount,
  markAllAsSeen,
}: NotificationFiltersProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4 w-fit rounded-2xl bg-text-on-accent-light dark:bg-text-on-accent-dark p-2">
        <SearchField name="search" className={`w-full sm:w-[256px]`}>
          <SearchField.Group>
            <SearchField.SearchIcon
              style={{ margin: 0, marginRight: "1rem" }}
            />
            <SearchField.Input
              placeholder="جستجو در عنوان یا متن"
              value={value.search}
              onChange={(e) =>
                onChange({
                  ...value,
                  search: e.target.value,
                })
              }
            />
            <SearchField.ClearButton
              style={{ margin: 0, marginLeft: "1rem" }}
            />
          </SearchField.Group>
        </SearchField>

        <Select
          value={value.type}
          onChange={(nextValue) =>
            onChange({
              ...value,
              type: nextValue as NotificationType | "all",
            })
          }
          className="w-full sm:w-[256px]"
          placeholder="نوع اعلان"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {notificationTypes.map((item) => (
                <ListBox.Item
                  key={item.value}
                  id={item.value}
                  textValue={item.label}
                >
                  {item.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          value={value.status}
          onChange={(nextValue) =>
            onChange({
              ...value,
              status: nextValue as NotificationFiltersState["status"],
            })
          }
          className="w-full sm:w-[256px]"
          placeholder="وضعیت اعلان"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item key="all" id="all" textValue="همه وضعیت‌ها">
                همه وضعیت‌ها
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item key="unseen" id="unseen" textValue="خوانده نشده">
                خوانده نشده
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item key="seen" id="seen" textValue="خوانده شده">
                خوانده شده
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
      <Button className={`w-full sm:w-fit`} onClick={markAllAsSeen} size="lg">
        <CircleCheckFill />
        خواندن همه
        <NotificationBadge count={unreadCount} />
      </Button>
    </div>
  );
}
