// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/colors`
  | `/conversa/:numberId/:to`
  | `/conversa/:numberId/:to/perfil`
  | `/empresa`
  | `/login`
  | `/templates`
  | `/templates/create`
  | `/usuario`

export type Params = {
  '/conversa/:numberId/:to': { numberId: string; to: string }
  '/conversa/:numberId/:to/perfil': { numberId: string; to: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
