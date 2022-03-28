
const comments = [
    {
        name: "Titulo de comentario",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "01/01/2021"
    },
    {
        name: "Titulo de comentario",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "01/01/2021"
    },
    {
        name: "Titulo de comentario",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "01/01/2021"
    }
]

const Comments = ({ }) => {

    return (
        <section role="Comentarios de usuarios" className="mt-2">
            <h4>Comentarios</h4>
            {
                comments.map(
                    (element, key) =>
                        <div key={key} className="card mt-2">
                            <div className="card-body">
                                <h5 class="card-text mt-2">{element.name}</h5>
                                <p class="card-text mt-2">{element.description}</p>
                                <p class="card-text mt-2"><small class="text-muted">{element.date}</small></p>
                            </div>
                        </div>)
            }
        </section>
    )

}

export default Comments;