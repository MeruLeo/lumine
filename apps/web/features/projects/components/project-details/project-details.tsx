import {
  Calendar,
  Clock,
  MapPin,
  Person,
  PersonNutHex,
  Signal,
  Tag,
} from "@gravity-ui/icons";
import { WalletIcon } from "lucide-react";
import type { ProjectDetailsProps } from "./project-details.types";
import { mapProjectToDetails } from "./project-details.utils";
import { ProjectStatusBadge } from "../project-status-badge";
import { PropertyRow } from "./sub-components/property-row";
import { PersonChip } from "./sub-components/person-chip";
import { Description } from "./sub-components/description";
import { CollaborationCta } from "./sub-components/collaboration-cta";
import { Separator } from "@heroui/react";
import { Can } from "@/shared/components/authorization/can";
import { ProjectAction } from "@/shared/lib/authorization/actions";

export const ProjectDetails = ({
  project,
  collaboration,
}: ProjectDetailsProps) => {
  const details = mapProjectToDetails({
    project,
    statusBadge: <ProjectStatusBadge status={project.status} />,
    employerChip: <PersonChip user={project.employer} />,
    modelChip: project.model ? <PersonChip user={project.model} /> : null,
    walletIcon: <WalletIcon className="h-4 w-4" />,
    tagIcon: <Tag />,
    mapPinIcon: <MapPin />,
    calendarIcon: <Calendar />,
    clockIcon: <Clock />,
    signalIcon: <Signal />,
    personIcon: <Person />,
    personNutHexIcon: <PersonNutHex />,
  });

  return (
    <article className="mx-auto mt-16 mb-24 flex w-full max-w-3xl flex-col px-4">
      <h1 className="mt-4 mb-8 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {project.name}
      </h1>

      <section
        className="flex flex-col"
        data-testid="project-properties-section"
      >
        {details
          .filter((item) => item.visible !== false)
          .map((item) => (
            <PropertyRow key={item.key} icon={item.icon} label={item.label}>
              {item.content}
            </PropertyRow>
          ))}
      </section>

      <Separator className="my-10" />
      <Description text={project.description} />

      {/* <Can action={ProjectAction.Apply}> */}
      <CollaborationCta
        onClick={collaboration?.onClick}
        isLoading={collaboration?.isLoading}
      />
      {/* </Can> */}
    </article>
  );
};

ProjectDetails.Property = PropertyRow;
ProjectDetails.Person = PersonChip;
ProjectDetails.Description = Description;
ProjectDetails.Cta = CollaborationCta;
