"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertPhone(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = parseFloat(formData.get("price") as string);
  const whatsapp_number = formData.get("whatsapp_number") as string;
  const review_video_url = formData.get("review_video_url") as string;
  const description = formData.get("description") as string;
  const is_featured = formData.get("is_featured") === "on";
  const imageUrl = formData.get("image_url") as string;
  
  // Basic specs as JSON
  const specs = {
    RAM: formData.get("ram"),
    Storage: formData.get("storage"),
    Camera: formData.get("camera"),
    Battery: formData.get("battery"),
  };

  const phoneData = {
    name,
    brand,
    price,
    whatsapp_number,
    review_video_url,
    description,
    is_featured,
    images: imageUrl ? [imageUrl] : [],
    specs,
  };

  let error;
  if (id) {
    const { error: updateError } = await supabase
      .from("phones")
      .update(phoneData)
      .eq("id", id);
    error = updateError;
  } else {
    const { error: insertError } = await supabase
      .from("phones")
      .insert([phoneData]);
    error = insertError;
  }

  if (error) {
    console.error("Error saving phone:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/phones");
  revalidatePath("/");
  redirect("/admin");
}

export async function deletePhone(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("phones")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting phone:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/phones");
  revalidatePath("/");
  redirect("/admin");
}
