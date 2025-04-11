import { InPostPoint, OperatingStatus } from './types'

interface InPostBoxProps {
  pointInfo?: InPostPoint
  setIsPackageMachineModalOpen?: (isOpen: boolean) => void
}

export const InPostBox = ({ pointInfo, setIsPackageMachineModalOpen }: InPostBoxProps) => {
  const clickHandler = () => {
    setIsPackageMachineModalOpen?.(true)
  }

  const OperatingStatusIcon = () => {
    return (
      <div
        className={`w-[6px] h-[6px] rounded-[6px] mr-1 ${
          pointInfo?.status === OperatingStatus.OPERATING
            ? 'bg-green-700'
            : pointInfo?.status === OperatingStatus.NON_OPERATING
            ? 'bg-orange-600'
            : 'bg-red-700'
        }`}
      ></div>
    )
  }

  return (
    <div>
      <div>{!pointInfo?.name && 'Wybierz Paczkomat'}</div>
      {pointInfo && (
        <div className='mt-1'>
          <div className='flex items-center text-xs'>
            <OperatingStatusIcon /> Paczkomat&reg; {pointInfo.name}
          </div>
          <div className='font-bold'>
            {pointInfo.address.line1}, {pointInfo.address_details.city}
          </div>
          <div className='text-xs'>{pointInfo.location_description}</div>
        </div>
      )}
      {!!setIsPackageMachineModalOpen && (
        <button
          className='mt-3 pl-2 pr-2 pt-1 pb-1 border-[3px] border-amber-600'
          type='button'
          onClick={clickHandler}
        >
          zmień
        </button>
      )}
    </div>
  )
}
