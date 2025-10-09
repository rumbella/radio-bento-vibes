-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  username text unique,
  bio text,
  date_of_birth date,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Policy: Everyone can view profiles
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Policy: Users can update their own profile
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Policy: Users can insert their own profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create likes table  
create table public.likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  session_id text,
  like_date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.likes enable row level security;

-- Create unique constraints for one like per day
create unique index idx_likes_user_date on public.likes (user_id, like_date) where user_id is not null;
create unique index idx_likes_session_date on public.likes (session_id, like_date) where session_id is not null;

-- Policy: Everyone can view likes
create policy "Likes are viewable by everyone"
  on public.likes for select
  using (true);

-- Policy: Anyone can insert likes
create policy "Anyone can insert likes"
  on public.likes for insert
  with check (true);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'preferred_username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Trigger for auto profile creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to get total likes
create or replace function public.get_total_likes()
returns bigint
language sql
stable
as $$
  select count(*) from public.likes;
$$;

-- Function to get today's likes
create or replace function public.get_today_likes()
returns bigint
language sql
stable
as $$
  select count(*) 
  from public.likes 
  where like_date = current_date;
$$;

-- Enable realtime for likes table
alter publication supabase_realtime add table public.likes;

-- Create storage bucket for avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage policies for avatars
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );