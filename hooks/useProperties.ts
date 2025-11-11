"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Property {
  id: string;
  user_id: string;
  bloque: string;
  portal: string;
  planta: string;
  letra: string;
  tipo: "Dueno" | "PropertyManager" | "Inquilino";
  created_at: string;
}

export function useProperties() {
  const supabase = createClient();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProperty = async (
    userId: string,
    property: Omit<Property, "id" | "user_id" | "created_at">
  ) => {
    try {
      console.log("[useProperties.addProperty] Adding property for user:", userId);
      setIsLoading(true);
      setError(null);

      const { data, error: insertError } = await supabase
        .from("properties")
        .insert([
          {
            user_id: userId,
            ...property,
          },
        ])
        .select();

      if (insertError) {
        console.error("[useProperties.addProperty] Error:", insertError);
        throw insertError;
      }

      console.log("[useProperties.addProperty] Property added successfully:", data);
      if (data && data.length > 0) {
        setProperties((prev) => [...prev, data[0]]);
      }

      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al agregar vivienda";
      console.error("[useProperties.addProperty] Error:", message);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProperties = async (userId: string) => {
    try {
      console.log("[useProperties.getProperties] Fetching properties for user:", userId);
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("properties")
        .select()
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("[useProperties.getProperties] Error:", fetchError);
        throw fetchError;
      }

      console.log("[useProperties.getProperties] Properties fetched:", data);
      setProperties(data || []);
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al obtener viviendas";
      console.error("[useProperties.getProperties] Error:", message);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      console.log("[useProperties.deleteProperty] Deleting property:", propertyId);
      setIsLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId);

      if (deleteError) {
        console.error("[useProperties.deleteProperty] Error:", deleteError);
        throw deleteError;
      }

      console.log("[useProperties.deleteProperty] Property deleted successfully");
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al eliminar vivienda";
      console.error("[useProperties.deleteProperty] Error:", message);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    properties,
    isLoading,
    error,
    addProperty,
    getProperties,
    deleteProperty,
  };
}
