export async function getFetchData(url: string) {
    const res = await fetch(url, {
        cache: 'no-cache'
    })

    if (!res.ok) throw new Error('Could not load notes')
    return await res.json();
}