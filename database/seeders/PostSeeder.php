<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Post;
use App\Models\User;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory()->count(10)->for(User::create([
            
            'name' => 'Admin',
            'email' => 'mail@mail.com',
            'password' => bcrypt('password'),
            
        ]))->create();
    }
}
