

const Breadcrumb = ({ routes }) => {
    let items = [];
    const keys = Object.keys(routes);
    keys.forEach(
        (key, index) => {
            if (index !== keys.length - 1) {
                items.push(
                    <li key={`breadcrumb-${index}`} class="breadcrumb-item"><a href={routes[key]}>{key}</a></li>
                );
            } else {
                items.push(
                    <li key={`breadcrumb-${index}`} class="breadcrumb-item active" aria-current="page">{key}</li>
                );
            }
        }
    )
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {items}
            </ol>
        </nav>
    )
}

export default Breadcrumb;