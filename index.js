module.exports = {
    hooks: {
        "page:before": function (page) {
            page.content = page.content.replace(/\[(.*)?](\(<(.*)>\)|\((.*?(?<!\\))\))/g, (match, g1, g2, g3, g4) => {
                const text = g1 != null ? g1 : '';
                let url = g3 != null ? g3 : g4;

                url = encodeURI(url.replace(/\\/g, ''))
                    .replace(/[!'()*]/g, (char) => {
                        return "%" + char.charCodeAt(0).toString(16);
                    });

                return `[${text}](${url})`;
            });

            return page;
        }
    }
};
