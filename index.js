import configList from './config.js';

class UninstallTracker {
  constructor() {}

  async trackIfNotAlreadyUninstalled() {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId');
    const key = urlParams.get('key');

    if (!userId || !key) return;

    const config = this.findMatchingConfig(key);
    if (!config) return;

    rudderanalytics.load(config.rudderstack_write_key, config.rudderstack_data_plane);

    const isUserAlreadyUninstalled = await this.checkIfUserUninstalled(userId, config.endpoint);
    if (isUserAlreadyUninstalled) return;

    rudderanalytics.setAnonymousId(userId);
    rudderanalytics.track("uninstalled_extension")
  }

  async checkIfUserUninstalled(userId, endPoint) {
    try {
      const response = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prolificId: userId }),
      });

      const data = await response.json();
      return !!data.error;
    } catch (err) {
      return true;
    }
  }

  findMatchingConfig(key) {
    return configList.find((c) => c.key === key);
  }
}

document.addEventListener('DOMContentLoaded', () => new UninstallTracker().trackIfNotAlreadyUninstalled());
