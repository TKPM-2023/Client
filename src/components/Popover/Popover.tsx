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
  initialOpen?: boolean
  placement?: Placement
}

function Popover({
  as: Element = 'div',
  placement = 'bottom',
  className,
  initialOpen = false,
  renderPopover,
  children
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const arrowRef = useRef<SVGSVGElement | null>(null)

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [flip(), shift(), arrow({ element: arrowRef }), offset(6)],
    whileElementsMounted: autoUpdate,
    placement
  })

  const hover = useHover(context, {
    handleClose: safePolygon()
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <Element ref={refs.setReference} {...getReferenceProps()} className={className}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
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
          </FloatingPortal>
        )}
      </AnimatePresence>
    </Element>
  )
}

export default Popover
