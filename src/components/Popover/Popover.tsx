import { ElementType, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  useFloating,
  useHover,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  flip,
  arrow,
  offset,
  autoUpdate,
  safePolygon,
  shift,
  Placement
} from '@floating-ui/react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  offsetValue?: number
  initialOpen?: boolean
  placement?: Placement
}

function Popover({
  as: Element = 'div',
  placement = 'bottom',
  offsetValue = 6,
  className,
  initialOpen = false,
  renderPopover,
  children
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<SVGSVGElement | null>(null)

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [flip(), shift(), arrow({ element: arrowRef }), offset(offsetValue)],
    whileElementsMounted: autoUpdate
  })

  const hover = useHover(context, {
    handleClose: safePolygon()
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <Element ref={refs.setReference} {...getReferenceProps()} className={className}>
      {children}

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className='z-10'>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: `${middlewareData.arrow?.x}px top` }}
              >
                <FloatingArrow ref={arrowRef} context={context} fill='white' />
                {renderPopover}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
