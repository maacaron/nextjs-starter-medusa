import { Button, Heading, Text } from '@medusajs/ui'

import LocalizedClientLink from '@modules/common/components/localized-client-link'

const SignInPrompt = () => {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <Heading level='h2' className='txt-xlarge'>
          Masz konto?
        </Heading>
        <Text className='txt-medium text-ui-fg-subtle mt-2'>Zaloguj się.</Text>
      </div>
      <div>
        <LocalizedClientLink href='/account'>
          <Button variant='secondary' className='h-10' data-testid='sign-in-button'>
            Zaloguj się
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
