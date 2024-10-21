import { ContactPhone } from "./contactPhone.model";

export interface Contact {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  notes: string | null;
  phones: ContactPhone[]
}
