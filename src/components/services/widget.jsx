import Sonarr from "./widgets/service/sonarr";
import Radarr from "./widgets/service/radarr";
import Ombi from "./widgets/service/ombi";
import Portainer from "./widgets/service/portainer";
import Emby from "./widgets/service/emby";
import Nzbget from "./widgets/service/nzbget";
import Docker from "./widgets/service/docker";
import Pihole from "./widgets/service/pihole";
import Rutorrent from "./widgets/service/rutorrent";
import Jellyfin from "./widgets/service/jellyfin";
import Speedtest from "./widgets/service/speedtest";
import Traefik from "./widgets/service/traefik";
import Jellyseerr from "./widgets/service/jellyseerr";
import Npm from "./widgets/service/npm";
import Tautulli from "./widgets/service/tautulli";
import Navidrome from "./widgets/service/navidrome";

const widgetMappings = {
  docker: Docker,
  sonarr: Sonarr,
  radarr: Radarr,
  ombi: Ombi,
  portainer: Portainer,
  emby: Emby,
  jellyfin: Jellyfin,
  nzbget: Nzbget,
  pihole: Pihole,
  rutorrent: Rutorrent,
  speedtest: Speedtest,
  traefik: Traefik,
  jellyseerr: Jellyseerr,
  npm: Npm,
  tautulli: Tautulli,
  navidrome: Navidrome,
};

export default function Widget({ service }) {
  const ServiceWidget = widgetMappings[service.widget.type];

  if (ServiceWidget) {
    return <ServiceWidget service={service} />;
  }

  return (
    <div className="bg-theme-200/50 dark:bg-theme-900/20 rounded m-1 flex-1 flex flex-col items-center justify-center p-1">
      <div className="font-thin text-sm">
        Missing Widget Type: <strong>{service.widget.type}</strong>
      </div>
    </div>
  );
}
