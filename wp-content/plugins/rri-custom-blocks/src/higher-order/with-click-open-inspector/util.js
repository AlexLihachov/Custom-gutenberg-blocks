export const openPanelId = panelId => {
    const panelToOpen = getPanel(panelId);
    if (panelToOpen) {
        const tab = getTabOfPanel(panelToOpen);
        openTab(tab)
        openPanel(panelToOpen)
    }

    return panelToOpen
};

const getPanel = panelId => {
    return document.querySelector(`.rri-panel--${panelId}`)
};

const getTabOfPanel = panelEl => {
    const panelContainer = panelEl.closest('.rri-inspector-panel-controls');
    if (!panelContainer) {
        return null
    }
    const panelTabMatch = panelContainer.getAttribute('class').match(/rri-panel-(\w+)/);
    if (panelTabMatch) {
        const panelTabName = panelTabMatch[1];
        return document.querySelector(`.rri-tab--${panelTabName}`)
    }
    return null
};

const openTab = tabEl => {
    if (tabEl) {
        if (!tabEl.classList.contains('is-active')) {
            tabEl.click()
        }
    }
};

const openPanel = panelEl => {
    if (!panelEl) {
        return
    }

    // Don't do anything if panel is already open.
    if (!panelEl.classList.contains('is-opened')) {
        const panelButton = panelEl.querySelector('button');
        // Open the panel if it's not yet open.
        if (panelButton) {
            panelButton.click()
        }
    }
    scrollPanelIntoView(panelEl)
};

export const scrollPanelIntoView = panelEl => {
    const tabs = document.querySelector('.rri-panel-tabs');
    const sidebarHeader = document.querySelector('.edit-post-sidebar-header');
    const sidebar = document.querySelector('.edit-post-sidebar');

    // Adjust the scroll manually instead of scrollIntoView since we have sticky tabs.
    document.querySelector('.edit-post-sidebar').scrollTop =
        document.querySelector('.edit-post-sidebar').scrollTop +
        (
            panelEl.getBoundingClientRect().top -
            (sidebarHeader ? sidebarHeader.getBoundingClientRect().bottom - 2 : sidebar.getBoundingClientRect().top) -
            (tabs ? tabs.getBoundingClientRect().height : 0)
        )
};
