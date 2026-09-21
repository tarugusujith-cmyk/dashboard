import { useEffect } from "react";
import { siteConfig } from "@/config";

export function usePageTitle(pageTitle: string) {
    useEffect(() => {
        const title = `${siteConfig.name} | ${pageTitle}`;
        document.title = title;

        return () => {
            document.title = siteConfig.name;
        };
    }, [pageTitle]);
}
