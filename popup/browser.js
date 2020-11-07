const construct_recent_urls_list = (recent_urls) => {
    if (!recent_urls || !recent_urls.length) {
        return;
    }

    const list_element = document.querySelector('#not-credentials ul');
    while (list_element.firstChild) {
        list_element.removeChild(list_element.firstChild);
    }

    recent_urls.forEach(recent_url => {
        const title = recent_url.title.substring(0, 31);
        const dots = title.length === 31 ? '...' : '';

        const new_a = document.createElement('a');
        new_a.href = recent_url.url;
        new_a.appendChild(document.createTextNode(`${title}${dots}`));

        const new_li = document.createElement('li');
        new_li.appendChild(document.createTextNode('> '));
        new_li.appendChild(new_a);

        list_element.prepend(new_li);
    });
};

set_input_values().then(({ recent_urls, email, password }) => {
    toggle_ui_section(email && password);
    construct_recent_urls_list(recent_urls)
});

document
    .getElementById('update-credentials')
    .addEventListener(
        'click',
        () => toggle_ui_section(false)
    );

document
    .getElementById('store-credentials')
    .addEventListener(
        'click',
        () => update_storage().then(({ email, password }) => {
            toggle_ui_section(email && password);
        })
    );
