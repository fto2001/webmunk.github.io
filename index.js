class UninstallTracker {
  constructor() {
    this.writeKey = '2jHOu6kXeXiLQx9aL1LJCFAPDvb',
    this.dataPlaneUrl = 'https://bufradkinoouml.dataplane.rudderstack.com',
    this.endpoint = 'https://uninstall-wuagwq3jva-uc.a.run.app'

    rudderanalytics.load(this.writeKey, this.dataPlaneUrl);
  }

  async trackIfNotAlreadyUninstalled() {
    const userId = new URLSearchParams(window.location.search).get('userId');
    if (!userId) return;

    const isUserAlreadyUninstalled = await this.checkIfUserUninstalled(userId);
    if (isUserAlreadyUninstalled) return;

    rudderanalytics.setAnonymousId(userId);
    rudderanalytics.track("uninstalled_extension")
  }

  async checkIfUserUninstalled(userId) {
    try {
      const response = await fetch(this.endpoint, {
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
}

document.addEventListener('DOMContentLoaded', () => new UninstallTracker().trackIfNotAlreadyUninstalled());
