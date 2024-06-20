# syntax = docker/dockerfile:1

# Rubyのバージョンを指定
ARG RUBY_VERSION=3.1.4

# Rubyの公式イメージを使用（amd64プラットフォームを指定）
FROM --platform=linux/amd64 registry.docker.com/library/ruby:$RUBY_VERSION-slim as base
WORKDIR /rails

# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libpq-dev postgresql-client curl gnupg2 && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs=14.* && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# Bundlerのインストール
RUN gem install bundler -v '2.4.13' && bundle install

# dotenvのインストール
RUN gem install dotenv

# アプリケーションコードのコピー
COPY . .

# アセットのプリコンパイル前にWebpackの設定をリロード
RUN bundle exec rails webpacker:install
RUN yarn install --check-files

# アセットのプリコンパイル
RUN RAILS_ENV=development bundle exec rake assets:precompile

# 非rootユーザーの作成
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails /rails
USER rails

# .envファイルをコピー
COPY .env .env

# ポート3000を開放
EXPOSE 3000

# 起動スクリプト
CMD bundle exec rails db:migrate && bundle exec rails server -b 0.0.0.0



# # syntax = docker/dockerfile:1

# # Rubyのバージョンを指定
# ARG RUBY_VERSION=3.1.4

# # Rubyの公式イメージを使用
# FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# # 作業ディレクトリの設定
# WORKDIR /rails

# # 必要なパッケージのインストール
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y \
#     build-essential \
#     libpq-dev \
#     postgresql-client \
#     curl \
#     gnupg2 && \
#     curl -sL https://deb.nodesource.com/setup_21.x | bash - && \
#     curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#     echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#     apt-get update && \
#     apt-get install -y nodejs yarn && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# # GemfileとGemfile.lockをコピー
# COPY Gemfile Gemfile.lock ./

# # Bundlerのインストール
# RUN gem install bundler -v '2.4.13' && bundle install

# # webpackerのインストール
# RUN bundle exec rails webpacker:install

# # アプリケーションコードのコピー
# COPY . .

# # アセットのプリコンパイル
# RUN RAILS_ENV=production bundle exec rake assets:precompile

# # 非rootユーザーの作成
# RUN useradd rails --create-home --shell /bin/bash && \
#     chown -R rails:rails /rails
# USER rails

# # 環境変数
# ENV RAILS_ENV=production

# # ポート3000を開放
# EXPOSE 3000

# # Railsサーバーを起動
# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]