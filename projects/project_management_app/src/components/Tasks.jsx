import NewTask from "./NewTask.jsx";


export default function Tasks () {

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">
        Tasks
      </h2>
      <NewTask/>
      <p className="text-stone-800 mb-4">
        This project dont have any tasks yet.
      </p>
      <ul></ul>
    </section>
  )
}