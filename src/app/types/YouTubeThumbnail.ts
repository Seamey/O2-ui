export function getYouTubeThumbnail(
    url: string,
    quality: "default" | "mq" | "hq" | "sd" | "maxres" = "hq"
): string | null {
    try {
        const parsedUrl = new URL(url);
        let videoId = "";

        // Handle youtu.be/<id>
        if (parsedUrl.hostname === "youtu.be") {
            videoId = parsedUrl.pathname.slice(1);
        }

        // Handle www.youtube.com/watch?v=<id>
        if (
            parsedUrl.hostname === "www.youtube.com" ||
            parsedUrl.hostname === "youtube.com" ||
            parsedUrl.hostname.endsWith(".youtube.com")
        ) {
            if (parsedUrl.pathname === "/watch") {
                videoId = parsedUrl.searchParams.get("v") || "";
            } else if (parsedUrl.pathname.startsWith("/shorts/")) {
                videoId = parsedUrl.pathname.split("/shorts/")[1];
            }
        }

        if (!videoId || videoId.length !== 11) return null;

        const qualityMap = {
            default: "default",
            mq: "mqdefault",
            hq: "hqdefault",
            sd: "sddefault",
            maxres: "maxresdefault",
        };

        return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
    } catch (error) {
        console.error("Invalid YouTube URL:", url);
        return null;
    }
}