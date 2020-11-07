const toggle_ui_section = (hide_credentials) => {
    if (hide_credentials) {
        document.getElementById('not-credentials').style.display = 'block';
        document.getElementById('credentials').style.display = 'none';
    } else {
        document.getElementById('not-credentials').style.display = 'none';
        document.getElementById('credentials').style.display = 'block';
    }
};

const set_input_values = async () => {
    const saved_storage = await browser.storage.local.get();
    const { email, password } = saved_storage;

    document.getElementById('email').value = email || '';
    document.getElementById('password').value = password || '';

    return saved_storage;
};

const update_storage = async (new_recent_url) => {
    const saved_storage = await browser.storage.local.get();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const new_storage = {
        ...saved_storage,
        email,
        password
    };

    if (new_recent_url) {
        if (!new_storage.recent_urls) {
            new_storage.recent_urls = [];
        }

        new_storage.recent_urls.push(new_recent_url);
    }

    browser.storage.local.set(new_storage);

    return new_storage;
};