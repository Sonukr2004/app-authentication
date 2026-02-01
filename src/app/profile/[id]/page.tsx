import React from 'react';

export default async function UserProfile({ params }: any) {
    // params may be a Promise in some server rendering paths — await it.
    const resolved = await params;
    const id = resolved?.id ?? 'unknown';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr />
            <p className="text-4xl">
                Profile page{' '}
                <span className="p-2 rounded bg-amber-500 text-black">{id}</span>
            </p>
        </div>
    );
}
