const tunnel_url = 'https://3de052fad1.loca.lt';

const update_ui = (data) => {
    const message = data.success || data.error;
    const color = (data.success ? 'green' : 'red');

    document.getElementById('not-credentials').style.display = 'none';
    document.getElementById('done').style.display = 'block';
    document.getElementById('message').innerHTML = message;
    document.getElementById('message').style.color = color;
};

const display_error_message = (error) => {
    update_ui({
        error
    });
}

const send_to_kindle = async (email, password) => {
    if (!email || !password) {
        return;
    }

    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    if (!tabs) {
        display_error_message('Not possible to fetch tabs');
        return;
    }

    const current_tab = tabs[0];
    if(!current_tab) {
        display_error_message('Not possible to fetch current tab');
        return;
    }

    const url = current_tab.url;
    if (!url) {
        display_error_message('Not possible to fetch current URL');
        return;
    }

    fetch(tunnel_url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url,
            email: email,
            password: password
        })
    })
        .then(response => {
            if (response.status === 200) {
                update_storage({
                    title: current_tab.title,
                    url
                });
            }

            return response.json();
        })
        .then(data => update_ui(data))
        .catch(err => display_error_message(
            `Sorry, but you may need to go to <a href="${tunnel_url}">${tunnel_url}</a> to set the tunnel's cookie.`
        ));
}

document
    .getElementById('store-credentials')
    .addEventListener(
        'click',
        () => update_storage().then(({ email, password }) => {
            toggle_ui_section(email && password);
            send_to_kindle(email, password);
        })
    );

set_input_values().then(({ email, password }) => {
    toggle_ui_section(email && password);
    send_to_kindle(email, password)
});