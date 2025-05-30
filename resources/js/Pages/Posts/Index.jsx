import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({auth,posts}) {

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        body: '',
    });
    
    function submit(e) {
        e.preventDefault()
        post(route("posts.store"), {
            onSuccess: () => {
                reset("body");
            },
        });
    }

    function refreshPosts() {
        router.visit(route("posts.index"), {
            only: ["posts"],
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <AuthenticatedLayout

            user={auth.name}

            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" >
                <meta name="description" content="Post Index"/> 
            </Head>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-3">

                    <form onSubmit={submit} className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        
                        <label htmlFor="body" className="sr-only">
                            Body
                        </label>

                        <textarea
                            onChange={(e) =>
                                setData("body", e.target.value)
                            }
                            onFocus={() => clearErrors("body")}
                            name="body"
                            id="body"
                            cols="30"
                            rows="5"
                            value={data.body}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                        ></textarea>
                        
                        {errors.body && (<p className="text-red-500">{errors.body}</p>)}
                            
                        <button
                            type="submit"
                            disabled={processing}
                            className={`mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white ${
                                processing && "opacity-50"
                            }`}
                        >
                            Post
                        </button>
                    </form>

                    <div className="py-3 flex justify-center">
                        {/* <Link
                    href={route('posts.index')}
                    only={['posts']}
                    preserveScroll
                        className="text-sm text-indigo-700"
                        type="button"
                    >
                        Refresh posts
                    </Link> */}
                        <button
                            onClick={refreshPosts}
                            className="text-sm text-indigo-700"
                            type="button"
                        >
                            Refresh posts
                        </button>
                    </div>

                    {posts.data.map((post) => {
                        return (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg" key={post.id}>
                                <div className="p-6 text-gray-900">
                                    <div className="font-semibold">
                                        {post.user.name}
                                    </div>
                                    <p className="mt-1">
                                        {post.body}
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
