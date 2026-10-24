-- Chạy file này một lần trong Supabase > SQL Editor (dự án tzvldizjkhuqozodhnpf).
-- Sau đó chạy dòng "Đặt cô Tú làm admin" ở cuối với email của cô.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'student' check (role in ('admin', 'student')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Hàm kiểm tra admin chạy với quyền chủ bảng để policy không tự gọi lại chính nó.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and active);
$$;

-- Tự tạo hồ sơ khi có người đăng ký (luôn là học viên).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Chỉ admin được đổi vai trò, trạng thái, email của hồ sơ.
create or replace function public.protect_profile_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() and (new.role <> old.role or new.active <> old.active or new.email <> old.email or new.id <> old.id) then
    raise exception 'Chỉ admin được đổi vai trò hoặc trạng thái tài khoản';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_columns on public.profiles;
create trigger protect_profile_columns
  before update on public.profiles
  for each row execute function public.protect_profile_columns();

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update" on public.profiles
  for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

-- Không có policy insert/delete: hồ sơ do trigger tạo, xoá theo tài khoản (Authentication > Users).

-- Đặt cô Tú làm admin (sửa email rồi chạy sau khi cô đã đăng ký tài khoản):
-- update public.profiles set role = 'admin' where email = 'EMAIL_CUA_CO_TU@gmail.com';

-- ===== Điểm XP và chuỗi ngày học =====
-- Mỗi dòng là một sự kiện cộng điểm (id cố định nên không bao giờ tính trùng).
create table if not exists public.learner_events (
  user_id uuid not null references auth.users (id) on delete cascade,
  id text not null,
  kind text not null check (kind in ('lesson', 'exercise')),
  key text not null,
  day date not null,
  xp integer not null check (xp between 0 and 20),
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.learner_events enable row level security;

drop policy if exists "events_select" on public.learner_events;
create policy "events_select" on public.learner_events
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "events_insert" on public.learner_events;
create policy "events_insert" on public.learner_events
  for insert with check (user_id = auth.uid());

-- Không có policy update/delete: điểm đã ghi thì không sửa được từ trình duyệt.
