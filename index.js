const BASE = "http://65.109.80.126:20409/aryan";

async function _getJson(url) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const json = await res.json();

        if (json == null) {
            throw new Error("Empty response");
        }

        if ((json.status === false) || (json.status === "error")) {
            const msg = json.message || json.error || "API returned error status";
            throw new Error(msg);
        }

        return json;
    } catch (err) {
        throw new Error(`aryan-pin Error: ${err.message}`); 
    }
}

async function pinterest(text, count = 10) {
    if (!text) {
        throw new Error("text (search query) is required");
    }
    
    const safeCount = Math.max(1, Math.min(100, count));

    const url = `${BASE}/pin?text=${encodeURIComponent(text)}&count=${safeCount}`;

    return _getJson(url);
}

module.exports = {
    pinterest,
};
