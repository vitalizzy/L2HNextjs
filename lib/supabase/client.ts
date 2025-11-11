import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document === "undefined") {
            return [];
          }
          const cookieString = document.cookie;
          return cookieString
            .split("; ")
            .map((c) => {
              const [key, ...rest] = c.split("=");
              return { name: key, value: rest.join("=") };
            })
            .filter((c) => c.name);
        },
        setAll(cookiesToSet) {
          if (typeof document === "undefined") {
            return;
          }
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieValue =
              typeof value === "object" ? JSON.stringify(value) : String(value);
            let cookieString = `${name}=${cookieValue}`;

            if (options?.maxAge) {
              cookieString += `; max-age=${options.maxAge}`;
            }
            if (options?.path) {
              cookieString += `; path=${options.path}`;
            }
            if (options?.domain) {
              cookieString += `; domain=${options.domain}`;
            }
            if (options?.sameSite) {
              cookieString += `; samesite=${options.sameSite}`;
            }
            if (options?.secure) {
              cookieString += "; secure";
            }

            document.cookie = cookieString;
          });
        },
      },
    }
  );
}

