import { Inngest } from "inngest";
import connectionSB from "./db";
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest function to save data to a database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses?.[0]?.email_address || "",
      name: `${first_name} ${last_name}`,
      imageURL: image_url,
    };

    await connectionSB();
    await User.create(userData);
  }
);

// Inngest function to update data in DB
export const syncUserUpdate = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      email: email_addresses?.[0]?.email_address || "",
      name: `${first_name} ${last_name}`,
      imageURL: image_url,
    };

    await connectionSB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectionSB();
    await User.findByIdAndDelete(id);
  }
);
