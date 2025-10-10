-- Fix security warnings: add search_path to functions

create or replace function public.get_total_likes()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*) from public.likes;
$$;

create or replace function public.get_today_likes()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*) 
  from public.likes 
  where like_date = current_date;
$$;