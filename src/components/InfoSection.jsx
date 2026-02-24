import React from 'react'

function InfoSection() {
  return (
    <div>
        <section>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
            <div className="md:col-span-3">
                <img src="https://images.unsplash.com/photo-1763016940383-3be9417637a4?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="rounded" alt="" />
            </div>

            <div className="md:col-span-1">
                <div className="max-w-prose md:max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    The Mercedes-AMG G63 is a luxury SUV with a 4.0L twin-turbo V8 producing brutal power and instant torque.
                </h2>

                <p className="mt-4 text-pretty text-gray-700">
                    It combines hardcore off-road capability with premium interior and aggressive, boxy styling that screams status.
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default InfoSection