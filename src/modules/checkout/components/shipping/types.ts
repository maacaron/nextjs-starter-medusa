import { Status } from 'react-instantsearch-dom'

export interface InPostPoint {
  address: { line1: string; line2: string }
  address_details: AddressInterface
  agency: string
  air_index_level?: string
  apm_doubled?: string
  distance: number
  easy_access_zone?: boolean
  functions: string[]
  href: string
  image_url: string
  is_next: boolean
  location: LocationInterface
  location_247: boolean
  location_date?: string
  location_description: string
  location_description_1?: string
  location_description_2?: string
  location_type: string
  name: string
  opening_hours: string
  operating_hours_extended: OpenedHoursWeek
  partner_id: number
  payment_available: boolean
  payment_point_descr: string
  payment_type: { 2?: string }
  phone_number?: string
  physical_type_description?: string
  physical_type_mapped: string
  recommended_low_interest_box_machines_list: string[]
  status: OperatingStatus
  supported_locker_temperatures?: number
  type: PointType
  virtual: string
}

interface AddressInterface {
  building_number: string
  city: string
  flat_number: string
  post_code: string
  province: string
  street: string
}

interface LocationInterface {
  distance?: number
  latitude: string
  longitude: string
}

interface OpenedHoursWeek {
  customer?: {
    friday: OpenedHoursRange[]
    monday: OpenedHoursRange[]
    saturday: OpenedHoursRange[]
    sunday: OpenedHoursRange[]
    thursday: OpenedHoursRange[]
    tuesday: OpenedHoursRange[]
    wednesday: OpenedHoursRange[]
  }
}

interface OpenedHoursRange {
  end: number
  start: number
}

enum PointType {
  PARCEL_LOCKER = 'parcel_locker',
  PARCEL_LOCKER_ONLY = 'parcel_locker_only',
  PARCEL_LOCKER_SUPERPOP = 'parcel_locker_superpop',
  POP = 'pop',
}

export enum OperatingStatus {
  OPERATING = 'Operating',
  NON_OPERATING = 'NonOperating',
  DISABLED = 'Disabled',
}
