"use server";

import { revalidatePath } from "next/cache";
import type { Product, CreateProductInput } from "../types";

export async function createProductAction(
  data: CreateProductInput
): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    // In production, insert to PostgreSQL or backend API
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...data,
    };

    // Next.js cache revalidation
    revalidatePath("/products");
    return { success: true, data: newProduct };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}
