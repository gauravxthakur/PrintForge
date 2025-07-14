import ModelsGrid from "@/app/components/ModelsGrid"
import type { ModelsPageProps } from "@/app/types"
import { getModels } from "@/app/lib/models"

export default async function Page({ searchParams }: ModelsPageProps) {
    const models = await getModels()

    // 1. Await searchParams to get the actual object (this resolves the Promise)
    const resolvedSearchParams = await searchParams;

    // 2. Initialize 'query' as an empty string to ensure its type
    let query: string = "";

    // 3. Safely access and process the 'query' parameter
    if (resolvedSearchParams?.query) {
        if (Array.isArray(resolvedSearchParams.query)) {
            // If 'query' is an array (e.g., ?query=a&query=b), take the first element
            // Ensure the first element is a string before calling toLowerCase
            query = resolvedSearchParams.query[0]?.toLowerCase() || "";
        } else if (typeof resolvedSearchParams.query === 'string') {
            // If 'query' is a single string, directly convert it to lowercase
            query = resolvedSearchParams.query.toLowerCase();
        }
        // If it's neither an array nor a string (e.g., undefined), 'query' remains ""
    }

    const filteredModels = query
        ? models.filter(model =>
            model.name.toLowerCase().includes(query) ||
            model.description.toLowerCase().includes(query)
        )
        : models

    return (
        <>
            <form className="w-full px-5 md:px-0 md:max-w-xl">
                <input
                    type="text"
                    name="query"
                    placeholder="E.g. dragon"
                    autoComplete="off"
                    defaultValue={query}
                    className="w-full py-3 pl-5 pr-5 text-sm placeholder-gray-500 bg-white border border-[#606060] rounded-full focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
                />
            </form>
            <ModelsGrid title="3D Models" models={filteredModels} />
        </>
    )
}