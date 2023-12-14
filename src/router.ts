// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/conversa/:to`
  | `/conversa/:to/perfil`
  | `/empresa`
  | `/login`
  | `/templates`
  | `/templates/create`
  | `/usuario`

export type Params = {
  '/conversa/:to': { to: string }
  '/conversa/:to/perfil': { to: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
