import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">Uwaga:</span> Płatność testowa.
    </Badge>
  )
}

export default PaymentTest
