export default function FileNotFoundErr() {
    return <div className="h-[80vh] w-full flex justify-center items-center flex-col">
        <h1 className="text-2xl">Oh no, an error occurred 😖</h1>
        <h2 className="text-lg text-muted-foreground">Hmm… we couldn't locate your file.</h2>
      </div>
}