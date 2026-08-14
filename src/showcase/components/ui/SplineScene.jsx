import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            {/* Animated robot loader */}
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-cyan-400/20 border-b-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center text-lg">🤖</div>
            </div>
            <span className="text-xs text-gray-500 animate-pulse">Loading 3D scene…</span>
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}


