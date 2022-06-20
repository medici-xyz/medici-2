import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types'
import validator from 'validator'
import { BsFillCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs'
import { utils } from 'ethers'
import { checkNameAvailability } from '../../utils/claims'
import useWallet from '../../hooks/useWallet'

const InputDetails: React.FC<StepperFormProps> = ({
  nextStep,
  handleInputData,
  data,
}) => {
  const { wallet } = useWallet()
  const [error, setError] = useState(false)
  const [isNameAvailable, setIsNameAvailable] = useState(false)
  const [isValidMasterAddress, setIsValidMasterAddress] = useState<boolean>()
  const [timer, setTimer] = useState<any>(null)

  // after form submit validating the form data using validator
  const submitFormData = (e: any) => {
    e.preventDefault()

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(data.name) ||
      validator.isEmpty(data.symbol) ||
      validator.isEmpty(data.masterAddress)
    ) {
      setError(true)
      alert('Please double check your input!')
    } else {
      ;(document.getElementById('input-name') as HTMLInputElement).disabled =
        true
      ;(document.getElementById('input-symbol') as HTMLInputElement).disabled =
        true
      ;(document.getElementById('input-master') as HTMLInputElement).disabled =
        true
      nextStep()
    }
  }

  const addressCheck = (address: string) => {
    try {
      const addressCheck = utils.getAddress(address)
      handleInputData('masterAddress', addressCheck)
      setIsValidMasterAddress(true)
    } catch {
      setIsValidMasterAddress(false)
    }
  }

  useEffect(() => {
    if (wallet) {
      const address = (
        document.getElementById('input-master') as HTMLInputElement
      ).value
      addressCheck(address)
    }
  }, [wallet])

  const nameCheck = async (event: any) => {
    if (event.target.value === '') {
      setIsNameAvailable(false)
      return
    } else {
      try {
        clearTimeout(timer)

        const newTimer = setTimeout(async () => {
          const isNameAvailable = await checkNameAvailability(
            event.target.value
          )
          if (isNameAvailable) {
            handleInputData('name', event.target.value)
            setIsNameAvailable(true)
            return
          } else {
            setIsNameAvailable(false)
            return
          }
        }, 500)

        setTimer(newTimer)
      } catch {
        setError(true)
        alert('There was an error')
      }
    }
  }

  return (
    <div className="w-full md:w-2/5 md:text-left flex flex-col mt-3">
      <label htmlFor="input-name" className="block lg:text-2xl py-2">
        Collection Title
      </label>
      <input
        id="input-name"
        type="text"
        className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none"
        onChange={nameCheck}
      />
      {data.name &&
        (isNameAvailable ? (
          <p className="text-green-500">Name is available!</p>
        ) : (
          <p className="text-[#F47174]">
            This name is not available, please try another name!
          </p>
        ))}
      <br></br>
      <label htmlFor="input-symbol" className="block lg:text-2xl py-2">
        Symbol
      </label>
      <input
        id="input-symbol"
        type="text"
        className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none"
        onChange={(event) => handleInputData('symbol', event.target.value)}
      />
      <br></br>
      <label htmlFor="input-master" className="block lg:text-2xl py-2">
        Master Address
      </label>
      <div className="inline-flex gap-4 w-full">
        <input
          id="input-master"
          type="text"
          defaultValue={wallet?.accounts[0].address}
          className="text-white md:text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none w-11/12"
          onChange={(event) => addressCheck(event.target.value)}
        />
        {isValidMasterAddress ? (
          <BsFillCheckSquareFill className="mt-3" size="30px" color="green" />
        ) : (
          <BsFillXSquareFill className="mt-3" size="30px" color="#F47174" />
        )}
      </div>
      <br></br>
      <div className="text-center mt-10">
        <button
          className="bg-gradient-to-r from-fuchsia-500 to-blue-500 p-3 rounded-3xl w-2/5 min-w-[100px]"
          onClick={submitFormData}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default InputDetails
